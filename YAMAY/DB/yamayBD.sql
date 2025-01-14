--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-01-14 15:09:32

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
-- TOC entry 218 (class 1259 OID 24607)
-- Name: patients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.patients (
    id integer NOT NULL,
    nom character varying NOT NULL,
    prenom character varying NOT NULL,
    cin character varying NOT NULL,
    ddn date,
    fh "char",
    ntel character varying,
    email character varying
);


ALTER TABLE public.patients OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 24606)
-- Name: PATIENT_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.patients ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."PATIENT_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 220 (class 1259 OID 32782)
-- Name: consultations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.consultations (
    id integer NOT NULL,
    idpatient integer NOT NULL,
    date date NOT NULL,
    mantant real
);


ALTER TABLE public.consultations OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 32781)
-- Name: consultation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.consultations ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.consultation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 223 (class 1259 OID 32804)
-- Name: mantant; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mantant (
    idpatient integer NOT NULL,
    total real NOT NULL,
    payee real
);


ALTER TABLE public.mantant OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 32792)
-- Name: rendezvous; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rendezvous (
    id integer NOT NULL,
    idpatient integer NOT NULL,
    date date NOT NULL,
    type character varying NOT NULL
);


ALTER TABLE public.rendezvous OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 32791)
-- Name: rendezvous_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.rendezvous ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.rendezvous_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 224 (class 1259 OID 32814)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 4714 (class 2606 OID 24613)
-- Name: patients PATIENT_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT "PATIENT_pkey" PRIMARY KEY (id);


--
-- TOC entry 4716 (class 2606 OID 32788)
-- Name: consultations consultation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consultations
    ADD CONSTRAINT consultation_pkey PRIMARY KEY (id, idpatient);


--
-- TOC entry 4720 (class 2606 OID 32808)
-- Name: mantant mantant_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mantant
    ADD CONSTRAINT mantant_pkey PRIMARY KEY (idpatient, total);


--
-- TOC entry 4718 (class 2606 OID 32798)
-- Name: rendezvous rendezvous_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rendezvous
    ADD CONSTRAINT rendezvous_pkey PRIMARY KEY (id, idpatient);


--
-- TOC entry 4722 (class 2606 OID 32820)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (email);


-- Completed on 2025-01-14 15:09:32

--
-- PostgreSQL database dump complete
--

