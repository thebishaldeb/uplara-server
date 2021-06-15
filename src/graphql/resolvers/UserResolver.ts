import bcrypt from "bcryptjs";
import axios from "axios";
import { IResolvers } from "graphql-tools";
import { ManagementClient } from "auth0";

import {
  AuthResponse,
  MutationRegisterArgs,
  MutationLoginArgs,
} from "../generated";

import knex from "../../db";
import config from "../../config";

const salt: any = config.SALT_ROUND;

const createPasswordHash = (password: string) => {
  return bcrypt.hash(password, salt) || false;
};

const management = new ManagementClient({
  clientId: String(config.CLIENT_ID),
  clientSecret: String(config.CLIENT_SECRET),
  scope: "create:users",
  domain: String(config.DOMAIN),
});

const getAccessToken = async (username: any) => {
  const body: any = {
    grant_type: "http://auth0.com/oauth/grant-type/password-realm",
    client_id: config.CLIENT_ID,
    client_secret: config.CLIENT_SECRET,
    username: username,
    password: config.DUMMY_PASSWORD,
    realm: "Username-Password-Authentication",
    audience: `https://${config.DOMAIN}/api/v2/`,
    scope: "openid profile email offline_access"
  };

  const url = `https://${config.DOMAIN}/oauth/token`;
  
  const response: any = await axios.post(url, body);

  return response.data.access_token;
};

export const UserResolvers: IResolvers = {
  Query: {},
  Mutation: {
    async login(
      _: void,
      { username, password }: MutationLoginArgs
    ): Promise<AuthResponse> {
      const user = await knex("user").where("username", username).first();

      if (!user) throw new Error("User doesn't exist");

      const passwordMatch: boolean = await bcrypt.compare(
        password,
        user.password
      );

      if (!passwordMatch) throw new Error("incorrect password!");
      
      const token: string = await getAccessToken(username);

      return { token, username: user.username, id: user.id };
    },
    async register(
      _: void,
      { username, password }: MutationRegisterArgs
    ): Promise<AuthResponse> {
      const user = await knex("user").where("username", username).first();

      if (user) throw new Error("User exists");

      const passwordHash: any = await createPasswordHash(password);

      const user_object = {
        connection: "Username-Password-Authentication",
        email: `${username}@example.com`,
        username: username,
        password: String(config.DUMMY_PASSWORD),
        email_verified: false,
        verify_email: false
      };

      const data = await management.createUser(user_object);

      const newUser = await knex("user").returning("id").insert({
        password: passwordHash,
        username,
        auth_id: data.user_id,
      });

      const token: string = await getAccessToken(username);

      return { token, username, id: newUser[0] };
    },
  },
};
