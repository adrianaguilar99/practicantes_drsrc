import { registerAs } from '@nestjs/config';
import { ENV } from './env.config';

export default registerAs('google-oauth', () => ({
  clientID: ENV.GOOGLE_OAUTH.CLIENT_ID,
  clientSecret: ENV.GOOGLE_OAUTH.SECRET,
  callbackURL: ENV.GOOGLE_OAUTH.CALLBACK_URL,
}));
