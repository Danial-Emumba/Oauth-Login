# Oauth-Login

### Cases handled

- User login with Google and Okta
- Support for user password to be optional in case of a third party login.
- Handle user login with both providers i.e. Add both providers for user (one to many relationship) if they decide to login with both.

### Cases that need to be addressed

- Local or direct system login would require us to check for exisiting user in DB against a third party provider. E.g. user has already logged in with either google or okta and now trying to signup with email/password. In this case we can use the reset/change password flow to send a verification email to the user on their registered email to update password that can later be used as direct login for user.

- Access/Refresh token or Issuer information returned from Google and Okta respectively is not being used/stored at the moment. If there's any requirement to use these for handling api interactions with the relevant provider, we'll need to store them somewhere.

- JWT token issuance not handled in this server due to lack of context for the implementation in the actual server.
