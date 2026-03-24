---
title: How SSO Works Under the Hood
description: A practical walkthrough of the mechanism behind Single Sign-On, from redirects and tokens to sessions, logout, and common security pitfalls.
date: 2026-03-25
category: Engineering
tags: [SSO, Authentication, OAuth, OpenID Connect, Security]
author: Sumit Kar
---

# How SSO Works Under the Hood

Single Sign-On, or SSO, sounds magical from the outside: log in once, and suddenly multiple apps trust you. Under the hood, though, it is a carefully choreographed exchange of redirects, tokens, cookies, signatures, and trust boundaries.

If you understand that choreography, SSO stops feeling mysterious and starts feeling like a very practical distributed system problem.

## The core idea

SSO works by separating two responsibilities:

- One system proves **who the user is**.
- Other applications decide **what that user can do**.

The system that authenticates the user is usually called the **Identity Provider (IdP)**. Examples include Okta, Microsoft Entra ID, Google Workspace, Auth0, or Keycloak.

The applications the user wants to access are called **Service Providers (SPs)** in SAML, or **Clients / Relying Parties** in OAuth and OpenID Connect.

Instead of every application storing its own username and password database, the applications delegate authentication to the IdP. That delegation is the heart of SSO.

## The three actors in a typical SSO flow

A simple mental model has three participants:

1. **User's browser**: carries redirects, cookies, and tokens between systems.
2. **Application**: wants to know who the user is.
3. **Identity Provider**: authenticates the user and vouches for their identity.

The browser is not just a passive viewer here. It is the transport layer for most login handshakes.

## What actually happens when you click "Login with SSO"

Let us walk through a common browser-based OpenID Connect flow, because it is the most common modern SSO pattern.

### Step 1: User tries to access the application

You open `app.example.com`. The app checks whether you already have a local session cookie.

If not, it knows two things:

- you are not yet authenticated with this app
- it needs help from the Identity Provider

So instead of showing a login form, it redirects your browser to the IdP.

### Step 2: The app sends an authentication request to the IdP

The redirect usually includes parameters such as:

- `client_id`: identifies the application
- `redirect_uri`: where the IdP should send the browser back afterward
- `scope`: what information the app is requesting
- `state`: a random value to prevent CSRF and preserve request context
- `nonce`: another random value used to bind the returned identity token to the request

At this point, the application is effectively saying:

> I need this user authenticated. If successful, send the browser back to me at this trusted callback URL.

### Step 3: The IdP checks whether the user is already logged in

Now the browser lands on the Identity Provider.

The IdP checks its own session cookie:

- If the user already logged in earlier, the IdP may not ask for credentials again.
- If no IdP session exists, the user must authenticate now.

This is where the "single sign-on" magic comes from. The user does **not** need to re-enter credentials for every app because the IdP already has an active session.

### Step 4: The user authenticates with the IdP

This can involve:

- username and password
- MFA
- hardware security keys
- device trust checks
- risk-based policies

Importantly, the password is entered only into the IdP, not into every downstream application.

### Step 5: The IdP returns proof of authentication

After successful login, the IdP redirects the browser back to the application's callback URL.

Depending on the protocol, it returns either:

- an **authorization code** that the app exchanges server-to-server
- or a signed assertion / token directly

In modern systems, the safest common pattern is:

- browser gets a short-lived **authorization code**
- app backend exchanges that code for tokens directly with the IdP

This is preferred because the sensitive tokens are not exposed unnecessarily in the browser URL.

### Step 6: The app validates the response

The application must now verify that the response is legitimate.

That usually means checking:

- the `state` matches what it originally sent
- the token signature is valid
- the token has not expired
- the issuer is the expected IdP
- the audience matches this application
- the `nonce` matches, if used

If those checks pass, the app now trusts the identity claim.

### Step 7: The app creates its own local session

This part is easy to miss, but it matters a lot.

Even after SSO succeeds, the application usually creates **its own session cookie**. That means:

- the IdP session proves the user authenticated centrally
- the app session keeps the user logged into that specific app

So SSO does not eliminate sessions. It usually creates **two layers of session state**:

- IdP session
- per-application session

## Why multiple apps do not ask you to log in again

Now imagine you visit another app, `dashboard.example.com`, that also trusts the same Identity Provider.

The flow repeats:

1. The second app redirects your browser to the IdP.
2. The IdP sees you already have a valid IdP session cookie.
3. The IdP immediately returns a fresh authentication response.
4. The second app creates its own local session.

From the user's perspective, this feels instant. From the system's perspective, it is simply reusing the existing IdP session.

That is SSO in one sentence:

**multiple applications trust one central identity session.**

## SSO is not one protocol

People often say "SSO" as if it were a single technology, but SSO is a pattern implemented by different protocols.

## SAML

SAML is common in enterprise environments and older SaaS integrations.

In SAML:

- the IdP sends a signed XML assertion
- the assertion states who the user is
- the Service Provider validates that assertion and creates a session

SAML is powerful and widely deployed, but the XML-based flow can feel heavy compared to newer protocols.

## OAuth 2.0

OAuth 2.0 is primarily an **authorization** protocol, not an authentication protocol.

Its original purpose is to let an application access some resource on behalf of a user, like reading a calendar or calling an API, without sharing the user's password.

By itself, OAuth does not guarantee identity in a standard way.

## OpenID Connect

OpenID Connect, or OIDC, adds an identity layer on top of OAuth 2.0.

That is why modern "Login with Google" or enterprise browser SSO often uses OIDC.

OIDC adds the **ID token**, which tells the application who the user is, and standardizes how identity claims are represented.

## The role of tokens

SSO discussions get much easier once you separate the token types.

## ID token

An ID token answers:

**Who is this user?**

It usually contains claims like:

- subject identifier
- email
- name
- issuer
- audience
- expiration time

It is meant for the application to verify identity, not to call APIs blindly.

## Access token

An access token answers:

**What resource can be accessed?**

It is meant for APIs. If your app needs to call a backend resource server, it uses the access token for authorization.

## Refresh token

A refresh token answers:

**Can I get a new access token without asking the user to log in again?**

Because refresh tokens are high-value credentials, they need stronger storage and rotation controls.

## Where sessions really live

In many real systems, users think there is "one login session." In reality, there can be several:

- browser cookie for the Identity Provider
- browser cookie for App A
- browser cookie for App B
- access token for APIs
- refresh token for silent renewal

This is why logout can be surprisingly tricky. Clearing one layer does not automatically clear every other layer.

## What about logout?

Login is easier than logout in distributed systems.

When a user clicks logout, several different things might need to happen:

- remove the application's local session
- invalidate refresh tokens
- end the IdP session
- notify other applications, if global logout is expected

If only the local app session is destroyed but the IdP session remains active, the next login attempt may silently sign the user back in.

That often surprises teams during implementation. They think logout is broken, but the system is actually doing exactly what SSO is designed to do: reuse the central identity session.

## Why SSO is secure when implemented correctly

A good SSO design reduces risk in a few important ways:

- credentials are entered in one place instead of many
- MFA and conditional access can be enforced centrally
- account disabling can cut off access across multiple apps
- applications no longer need to store passwords themselves

But "implemented correctly" matters a lot.

The security guarantees depend on validating signatures, checking audiences, protecting redirect URIs, securing cookies, and handling token lifetimes carefully.

## Common implementation mistakes

These are some of the most common ways SSO integrations go wrong.

## Trusting tokens without validating them

A token is useful only if the application verifies:

- signature
- issuer
- audience
- expiry
- nonce and state where applicable

Skipping those checks turns signed identity into unauthenticated input.

## Misconfigured redirect URIs

If callback URLs are too broad or weakly validated, attackers may be able to capture codes or tokens.

Redirect URI validation should be exact and tightly controlled.

## Treating OAuth as authentication without OIDC

OAuth alone is not enough to reliably identify a user.

If your goal is login, use OpenID Connect or another proper authentication mechanism.

## Confusing authentication with authorization

SSO tells the app **who the user is**.

It does not automatically decide:

- whether the user is an admin
- what tenant they belong to
- which records they may access

Those decisions still belong to the application's authorization layer.

## Not planning session lifetime and logout behavior

Short token lifetimes with long-lived app sessions can create strange behavior. So can long-lived IdP sessions with short local sessions.

You need a deliberate strategy for:

- idle timeout
- absolute timeout
- token refresh
- re-authentication requirements
- local logout versus global logout

## A compact end-to-end picture

If you want the shortest possible mental model, it looks like this:

1. User visits an app.
2. App redirects browser to the Identity Provider.
3. IdP authenticates user or reuses an existing IdP session.
4. IdP returns signed proof of authentication.
5. App validates that proof.
6. App creates its own local session.
7. Other apps repeat the same handshake and benefit from the same IdP session.

That is the mechanism.

## Final takeaway

SSO is less about "one token for every app" and more about **shared trust in a central identity authority**.

The Identity Provider authenticates once. Each application verifies that identity proof and then establishes its own session. The smooth user experience comes from reusing the IdP's session across many apps, while the underlying security comes from strict validation, scoped trust, and careful session handling.

Once you see SSO as a combination of **redirect choreography**, **token validation**, and **session management**, the whole system becomes far easier to design, debug, and secure.
