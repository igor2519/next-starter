'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.sequelize.query(`CREATE TABLE IF NOT EXISTS users
      (
          id uuid NOT NULL,
          name character varying(255) COLLATE pg_catalog."default",
          email character varying(255) COLLATE pg_catalog."default",
          role integer DEFAULT 0,
          status integer DEFAULT 0,
          email_verified timestamp with time zone,
          password character varying(255) COLLATE pg_catalog."default",
          image character varying(255) COLLATE pg_catalog."default",
          created_at timestamp with time zone NOT NULL DEFAULT NOW(),
          updated_at timestamp with time zone NOT NULL DEFAULT NOW(),
          CONSTRAINT users_pkey PRIMARY KEY (id),
          CONSTRAINT users_email_key UNIQUE (email)
      )`, {transaction});
      await queryInterface.sequelize.query(`CREATE TABLE IF NOT EXISTS accounts
      (
          id uuid NOT NULL,
          type character varying(255) COLLATE pg_catalog."default" NOT NULL,
          provider character varying(255) COLLATE pg_catalog."default" NOT NULL,
          provider_account_id character varying(255) COLLATE pg_catalog."default" NOT NULL,
          refresh_token character varying(255) COLLATE pg_catalog."default",
          access_token character varying(255) COLLATE pg_catalog."default",
          expires_at integer,
          token_type character varying(255) COLLATE pg_catalog."default",
          scope character varying(255) COLLATE pg_catalog."default",
          id_token text COLLATE pg_catalog."default",
          session_state character varying(255) COLLATE pg_catalog."default",
          user_id uuid,
          CONSTRAINT accounts_pkey PRIMARY KEY (id),
          CONSTRAINT accounts_user_id_fkey FOREIGN KEY (user_id)
              REFERENCES users (id) MATCH SIMPLE
              ON UPDATE CASCADE
              ON DELETE CASCADE
      )`, {transaction});
      await queryInterface.sequelize.query(`CREATE TABLE IF NOT EXISTS sessions
      (
          id uuid NOT NULL,
          expires timestamp with time zone NOT NULL,
          session_token character varying(255) COLLATE pg_catalog."default" NOT NULL,
          user_id uuid,
          CONSTRAINT sessions_pkey PRIMARY KEY (id),
          CONSTRAINT sessions_session_token_key UNIQUE (session_token),
          CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id)
              REFERENCES users (id) MATCH SIMPLE
              ON UPDATE CASCADE
              ON DELETE CASCADE
      )`, {transaction});
      await queryInterface.sequelize.query(`CREATE TABLE IF NOT EXISTS verification_tokens
      (
          token character varying(255) COLLATE pg_catalog."default" NOT NULL,
          identifier character varying(255) COLLATE pg_catalog."default" NOT NULL,
          expires timestamp with time zone NOT NULL,
          CONSTRAINT verification_tokens_pkey PRIMARY KEY (token)
      )`, {transaction});
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.dropTable('verification_tokens', {transaction});
      await queryInterface.dropTable('sessions', {transaction});
      await queryInterface.dropTable('accounts', {transaction});
      await queryInterface.dropTable('users', {transaction});
    });
  }
};
