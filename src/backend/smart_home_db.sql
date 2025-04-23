--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-04-20 21:55:53

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16419)
-- Name: account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account (
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    fname character varying(255) NOT NULL,
    lname character varying(255) NOT NULL
);


ALTER TABLE public.account OWNER TO postgres;

--
-- TOC entry 4890 (class 0 OID 16419)
-- Dependencies: 217
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.account (username, email, password, fname, lname) FROM stdin;
an1	daothiha@gmail.com	$2b$10$YBaUhFLXBK48jad0puVwZeBgk/kjqe6hdCXKmTo53hH4nGN1wmdIK	An	DAo
haan	dao@gmail.com	$2b$10$pTkvrpwfAVnn3J6jPlH.aOBlAJ3Ju9lW1hY8pXLWWY0hiJC/wAV.W	Ha	Dao
an5	d@gmail.com	$2b$10$mHw9xDsr3Wm5C27meFl9MeYRTkr3d5T7WAX71gyniQFpwfe3aM6Hu	A	D
an	daothihaan@gmail.com	$2b$10$RQktd487MHTm7a0y40FhNukogAdtqAe1xIFTJlQQ1TbV6.dDmOiqq	An	Dao
\.


--
-- TOC entry 4742 (class 2606 OID 16427)
-- Name: account account_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_email_key UNIQUE (email);


--
-- TOC entry 4744 (class 2606 OID 16425)
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (username);


-- Completed on 2025-04-20 21:55:53

--
-- PostgreSQL database dump complete
--

