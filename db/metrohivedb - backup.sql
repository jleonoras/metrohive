--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

-- Started on 2022-09-26 19:59:14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- TOC entry 210 (class 1259 OID 25612)
-- Name: account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account (
    account_id bigint NOT NULL,
    email text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.account OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 25611)
-- Name: account_account_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.account_account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_account_id_seq OWNER TO postgres;

--
-- TOC entry 3377 (class 0 OID 0)
-- Dependencies: 209
-- Name: account_account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.account_account_id_seq OWNED BY public.account.account_id;


--
-- TOC entry 214 (class 1259 OID 25623)
-- Name: comment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comment (
    comment_id bigint NOT NULL,
    message text,
    account_id bigint NOT NULL,
    listing_id bigint NOT NULL
);


ALTER TABLE public.comment OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 25621)
-- Name: comment_account_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comment_account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comment_account_id_seq OWNER TO postgres;

--
-- TOC entry 3378 (class 0 OID 0)
-- Dependencies: 212
-- Name: comment_account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comment_account_id_seq OWNED BY public.comment.account_id;


--
-- TOC entry 211 (class 1259 OID 25620)
-- Name: comment_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comment_comment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comment_comment_id_seq OWNER TO postgres;

--
-- TOC entry 3379 (class 0 OID 0)
-- Dependencies: 211
-- Name: comment_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comment_comment_id_seq OWNED BY public.comment.comment_id;


--
-- TOC entry 213 (class 1259 OID 25622)
-- Name: comment_listing_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comment_listing_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comment_listing_id_seq OWNER TO postgres;

--
-- TOC entry 3380 (class 0 OID 0)
-- Dependencies: 213
-- Name: comment_listing_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comment_listing_id_seq OWNED BY public.comment.listing_id;


--
-- TOC entry 218 (class 1259 OID 25636)
-- Name: like; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."like" (
    like_id bigint NOT NULL,
    account_id bigint NOT NULL,
    listing_id bigint NOT NULL
);


ALTER TABLE public."like" OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 25634)
-- Name: like_account_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.like_account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.like_account_id_seq OWNER TO postgres;

--
-- TOC entry 3381 (class 0 OID 0)
-- Dependencies: 216
-- Name: like_account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.like_account_id_seq OWNED BY public."like".account_id;


--
-- TOC entry 215 (class 1259 OID 25633)
-- Name: like_like_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.like_like_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.like_like_id_seq OWNER TO postgres;

--
-- TOC entry 3382 (class 0 OID 0)
-- Dependencies: 215
-- Name: like_like_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.like_like_id_seq OWNED BY public."like".like_id;


--
-- TOC entry 217 (class 1259 OID 25635)
-- Name: like_listing_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.like_listing_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.like_listing_id_seq OWNER TO postgres;

--
-- TOC entry 3383 (class 0 OID 0)
-- Dependencies: 217
-- Name: like_listing_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.like_listing_id_seq OWNED BY public."like".listing_id;


--
-- TOC entry 221 (class 1259 OID 25646)
-- Name: listing; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.listing (
    listing_id bigint NOT NULL,
    description text NOT NULL,
    location text NOT NULL,
    price integer NOT NULL,
    status text NOT NULL,
    image1 text NOT NULL,
    image2 text NOT NULL,
    image3 text NOT NULL,
    image4 text,
    image5 text,
    featured boolean,
    account_id bigint NOT NULL
);


ALTER TABLE public.listing OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 25645)
-- Name: listing_account_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.listing_account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.listing_account_id_seq OWNER TO postgres;

--
-- TOC entry 3384 (class 0 OID 0)
-- Dependencies: 220
-- Name: listing_account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.listing_account_id_seq OWNED BY public.listing.account_id;


--
-- TOC entry 219 (class 1259 OID 25644)
-- Name: listing_listing_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.listing_listing_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.listing_listing_id_seq OWNER TO postgres;

--
-- TOC entry 3385 (class 0 OID 0)
-- Dependencies: 219
-- Name: listing_listing_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.listing_listing_id_seq OWNED BY public.listing.listing_id;


--
-- TOC entry 224 (class 1259 OID 25657)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    user_id bigint NOT NULL,
    fname text NOT NULL,
    lname text NOT NULL,
    age integer,
    gender text,
    address text,
    contact character varying(11),
    account_id bigint NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 25656)
-- Name: user_account_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_account_id_seq OWNER TO postgres;

--
-- TOC entry 3386 (class 0 OID 0)
-- Dependencies: 223
-- Name: user_account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_account_id_seq OWNED BY public."user".account_id;


--
-- TOC entry 222 (class 1259 OID 25655)
-- Name: user_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_user_id_seq OWNER TO postgres;

--
-- TOC entry 3387 (class 0 OID 0)
-- Dependencies: 222
-- Name: user_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_user_id_seq OWNED BY public."user".user_id;


--
-- TOC entry 3190 (class 2604 OID 25615)
-- Name: account account_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account ALTER COLUMN account_id SET DEFAULT nextval('public.account_account_id_seq'::regclass);


--
-- TOC entry 3191 (class 2604 OID 25626)
-- Name: comment comment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment ALTER COLUMN comment_id SET DEFAULT nextval('public.comment_comment_id_seq'::regclass);


--
-- TOC entry 3192 (class 2604 OID 25627)
-- Name: comment account_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment ALTER COLUMN account_id SET DEFAULT nextval('public.comment_account_id_seq'::regclass);


--
-- TOC entry 3193 (class 2604 OID 25628)
-- Name: comment listing_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment ALTER COLUMN listing_id SET DEFAULT nextval('public.comment_listing_id_seq'::regclass);


--
-- TOC entry 3194 (class 2604 OID 25639)
-- Name: like like_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."like" ALTER COLUMN like_id SET DEFAULT nextval('public.like_like_id_seq'::regclass);


--
-- TOC entry 3195 (class 2604 OID 25640)
-- Name: like account_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."like" ALTER COLUMN account_id SET DEFAULT nextval('public.like_account_id_seq'::regclass);


--
-- TOC entry 3196 (class 2604 OID 25641)
-- Name: like listing_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."like" ALTER COLUMN listing_id SET DEFAULT nextval('public.like_listing_id_seq'::regclass);


--
-- TOC entry 3197 (class 2604 OID 25649)
-- Name: listing listing_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listing ALTER COLUMN listing_id SET DEFAULT nextval('public.listing_listing_id_seq'::regclass);


--
-- TOC entry 3198 (class 2604 OID 25650)
-- Name: listing account_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listing ALTER COLUMN account_id SET DEFAULT nextval('public.listing_account_id_seq'::regclass);


--
-- TOC entry 3199 (class 2604 OID 25660)
-- Name: user user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN user_id SET DEFAULT nextval('public.user_user_id_seq'::regclass);


--
-- TOC entry 3200 (class 2604 OID 25661)
-- Name: user account_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN account_id SET DEFAULT nextval('public.user_account_id_seq'::regclass);


--
-- TOC entry 3357 (class 0 OID 25612)
-- Dependencies: 210
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.account (account_id, email, password) FROM stdin;
1	john@mail.com	pass123
\.


--
-- TOC entry 3361 (class 0 OID 25623)
-- Dependencies: 214
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comment (comment_id, message, account_id, listing_id) FROM stdin;
\.


--
-- TOC entry 3365 (class 0 OID 25636)
-- Dependencies: 218
-- Data for Name: like; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."like" (like_id, account_id, listing_id) FROM stdin;
\.


--
-- TOC entry 3368 (class 0 OID 25646)
-- Dependencies: 221
-- Data for Name: listing; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.listing (listing_id, description, location, price, status, image1, image2, image3, image4, image5, featured, account_id) FROM stdin;
\.


--
-- TOC entry 3371 (class 0 OID 25657)
-- Dependencies: 224
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (user_id, fname, lname, age, gender, address, contact, account_id) FROM stdin;
1	John	Leonoras	\N	Male	\N	\N	1
\.


--
-- TOC entry 3388 (class 0 OID 0)
-- Dependencies: 209
-- Name: account_account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.account_account_id_seq', 1, true);


--
-- TOC entry 3389 (class 0 OID 0)
-- Dependencies: 212
-- Name: comment_account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comment_account_id_seq', 1, false);


--
-- TOC entry 3390 (class 0 OID 0)
-- Dependencies: 211
-- Name: comment_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comment_comment_id_seq', 1, false);


--
-- TOC entry 3391 (class 0 OID 0)
-- Dependencies: 213
-- Name: comment_listing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comment_listing_id_seq', 1, false);


--
-- TOC entry 3392 (class 0 OID 0)
-- Dependencies: 216
-- Name: like_account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.like_account_id_seq', 1, false);


--
-- TOC entry 3393 (class 0 OID 0)
-- Dependencies: 215
-- Name: like_like_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.like_like_id_seq', 1, false);


--
-- TOC entry 3394 (class 0 OID 0)
-- Dependencies: 217
-- Name: like_listing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.like_listing_id_seq', 1, false);


--
-- TOC entry 3395 (class 0 OID 0)
-- Dependencies: 220
-- Name: listing_account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.listing_account_id_seq', 1, false);


--
-- TOC entry 3396 (class 0 OID 0)
-- Dependencies: 219
-- Name: listing_listing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.listing_listing_id_seq', 1, false);


--
-- TOC entry 3397 (class 0 OID 0)
-- Dependencies: 223
-- Name: user_account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_account_id_seq', 1, true);


--
-- TOC entry 3398 (class 0 OID 0)
-- Dependencies: 222
-- Name: user_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_user_id_seq', 1, true);


--
-- TOC entry 3202 (class 2606 OID 25619)
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (account_id);


--
-- TOC entry 3204 (class 2606 OID 25632)
-- Name: comment comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (comment_id);


--
-- TOC entry 3206 (class 2606 OID 25643)
-- Name: like like_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."like"
    ADD CONSTRAINT like_pkey PRIMARY KEY (like_id);


--
-- TOC entry 3208 (class 2606 OID 25654)
-- Name: listing listing_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listing
    ADD CONSTRAINT listing_pkey PRIMARY KEY (listing_id);


--
-- TOC entry 3210 (class 2606 OID 25665)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3211 (class 2606 OID 25671)
-- Name: comment fk_account_to_comment; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT fk_account_to_comment FOREIGN KEY (account_id) REFERENCES public.account(account_id);


--
-- TOC entry 3213 (class 2606 OID 25681)
-- Name: like fk_account_to_like; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."like"
    ADD CONSTRAINT fk_account_to_like FOREIGN KEY (account_id) REFERENCES public.account(account_id);


--
-- TOC entry 3215 (class 2606 OID 25676)
-- Name: listing fk_account_to_listing; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listing
    ADD CONSTRAINT fk_account_to_listing FOREIGN KEY (account_id) REFERENCES public.account(account_id);


--
-- TOC entry 3216 (class 2606 OID 25666)
-- Name: user fk_account_to_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT fk_account_to_user FOREIGN KEY (account_id) REFERENCES public.account(account_id);


--
-- TOC entry 3212 (class 2606 OID 25686)
-- Name: comment fk_listing_to_comment; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT fk_listing_to_comment FOREIGN KEY (listing_id) REFERENCES public.listing(listing_id);


--
-- TOC entry 3214 (class 2606 OID 25691)
-- Name: like fk_listing_to_like; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."like"
    ADD CONSTRAINT fk_listing_to_like FOREIGN KEY (listing_id) REFERENCES public.listing(listing_id);


-- Completed on 2022-09-26 19:59:15

--
-- PostgreSQL database dump complete
--

