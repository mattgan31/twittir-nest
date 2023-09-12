--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 15.2

-- Started on 2023-09-12 13:56:30

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

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 21502)
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    "userId" integer,
    "postId" integer,
    description character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 21501)
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq OWNER TO postgres;

--
-- TOC entry 3361 (class 0 OID 0)
-- Dependencies: 213
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- TOC entry 218 (class 1259 OID 38924)
-- Name: likes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.likes (
    id integer NOT NULL,
    "userId" integer,
    "postId" integer,
    "commentId" integer,
    "createdAt" timestamp without time zone DEFAULT now()
);


ALTER TABLE public.likes OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 38923)
-- Name: likes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.likes_id_seq OWNER TO postgres;

--
-- TOC entry 3362 (class 0 OID 0)
-- Dependencies: 217
-- Name: likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;


--
-- TOC entry 212 (class 1259 OID 16444)
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    "userId" integer,
    post character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16443)
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posts_id_seq OWNER TO postgres;

--
-- TOC entry 3363 (class 0 OID 0)
-- Dependencies: 211
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- TOC entry 216 (class 1259 OID 21597)
-- Name: relationships; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.relationships (
    id integer NOT NULL,
    "followerId" integer,
    "followingId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.relationships OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 21596)
-- Name: relationships_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.relationships_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.relationships_id_seq OWNER TO postgres;

--
-- TOC entry 3364 (class 0 OID 0)
-- Dependencies: 215
-- Name: relationships_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.relationships_id_seq OWNED BY public.relationships.id;


--
-- TOC entry 210 (class 1259 OID 16428)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255),
    password character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    profile_picture character varying(255)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16427)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3365 (class 0 OID 0)
-- Dependencies: 209
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3186 (class 2604 OID 21505)
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- TOC entry 3188 (class 2604 OID 38927)
-- Name: likes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);


--
-- TOC entry 3185 (class 2604 OID 16447)
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- TOC entry 3187 (class 2604 OID 21600)
-- Name: relationships id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relationships ALTER COLUMN id SET DEFAULT nextval('public.relationships_id_seq'::regclass);


--
-- TOC entry 3184 (class 2604 OID 16431)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3350 (class 0 OID 21502)
-- Dependencies: 214
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (id, "userId", "postId", description, "createdAt", "updatedAt") FROM stdin;
1	4	1	masa ngantuk sih	2023-06-06 11:19:49.805+07	2023-06-06 11:19:49.805+07
7	4	1	Iya atuh gaboleh ?	2023-07-11 17:31:36.587+07	2023-07-11 17:31:36.587+07
8	4	1	Bolehhhh	2023-07-11 19:32:01.142+07	2023-07-11 19:32:01.142+07
9	4	1	Bolehhhh	2023-07-11 19:32:02.835+07	2023-07-11 19:32:02.835+07
10	4	1	Bolehhhh	2023-07-11 19:32:05.189+07	2023-07-11 19:32:05.189+07
11	5	1	Yaudah	2023-07-11 19:33:54.347+07	2023-07-11 19:33:54.347+07
12	5	1	Iya	2023-07-11 19:35:52.315+07	2023-07-11 19:35:52.315+07
13	5	1	test	2023-07-11 19:37:26.049+07	2023-07-11 19:37:26.049+07
14	4	2	Yoi bray sama	2023-07-23 19:18:58.538+07	2023-07-23 19:18:58.538+07
15	5	5	Asli bray emang iya	2023-07-23 19:26:16.11+07	2023-07-23 19:26:16.11+07
17	\N	\N	Nyoba komen juga deh	2023-08-25 15:57:12.098+07	2023-08-25 15:57:12.098+07
18	\N	\N	Test ah	2023-08-26 18:06:46.17+07	2023-08-26 18:06:46.17+07
19	\N	\N	Test ah	2023-08-26 18:09:06.581+07	2023-08-26 18:09:06.581+07
20	\N	\N	Cobain lagi dah	2023-08-26 18:42:35.53+07	2023-08-26 18:42:35.53+07
21	\N	\N	Cobain test dah	2023-08-26 18:43:18.427+07	2023-08-26 18:43:18.427+07
22	\N	\N	\N	2023-08-26 18:44:48.506+07	2023-08-26 18:44:48.506+07
23	\N	\N	Cobain lagi dah	2023-08-26 18:45:23.146+07	2023-08-26 18:45:23.146+07
24	5	4	Honda sekarang kenapa yah ?	2023-08-30 09:31:09.631+07	2023-08-30 09:31:09.631+07
25	7	6	Coba komen lagi dah	2023-08-31 14:08:34.646+07	2023-08-31 14:08:34.646+07
26	4	8	Baik sekali, bagaimana denganmu ?	2023-09-01 13:41:58.145+07	2023-09-01 13:41:58.145+07
\.


--
-- TOC entry 3354 (class 0 OID 38924)
-- Dependencies: 218
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.likes (id, "userId", "postId", "commentId", "createdAt") FROM stdin;
1	5	5	\N	\N
2	5	\N	15	\N
78	7	2	\N	2023-08-29 18:15:50.678367
85	7	4	\N	2023-08-30 09:05:30.835756
89	5	4	\N	2023-08-30 09:34:40.933691
90	5	\N	24	2023-08-30 09:34:45.546522
91	5	6	\N	2023-08-30 09:42:25.115748
92	5	3	\N	2023-08-30 09:42:28.334702
93	5	2	\N	2023-08-30 09:42:29.745727
94	5	1	\N	2023-08-30 09:42:30.947795
95	5	\N	1	2023-08-30 09:42:33.713214
96	5	\N	7	2023-08-30 09:42:35.540704
97	5	\N	8	2023-08-30 09:42:37.744759
98	5	\N	9	2023-08-30 09:42:38.999289
99	5	\N	10	2023-08-30 09:42:40.111057
100	5	\N	12	2023-08-30 09:42:42.152369
101	5	\N	11	2023-08-30 09:42:44.054713
102	5	\N	13	2023-08-30 09:42:48.79685
103	4	6	\N	2023-08-30 09:51:38.556753
104	4	4	\N	2023-08-30 09:51:42.316391
41	7	3	\N	2023-08-29 18:01:30.01595
105	4	3	\N	2023-08-30 09:51:43.794321
106	4	2	\N	2023-08-30 09:51:45.064084
107	4	1	\N	2023-08-30 09:51:46.358118
108	4	\N	15	2023-08-30 09:51:58.943309
109	7	1	\N	2023-08-30 13:45:24.650112
110	7	\N	25	2023-08-31 14:08:37.672186
111	7	5	\N	2023-08-31 19:23:53.388545
112	7	6	\N	2023-08-31 19:48:51.117926
113	4	\N	25	2023-09-01 09:07:56.306545
114	4	\N	1	2023-09-01 10:11:50.976829
115	7	8	\N	2023-09-01 13:39:59.144787
116	4	8	\N	2023-09-01 13:41:45.969363
117	4	9	\N	2023-09-01 13:42:31.588925
118	8	9	\N	2023-09-01 13:47:57.832153
119	8	8	\N	2023-09-01 13:47:58.60419
120	8	10	\N	2023-09-01 13:51:02.969025
121	8	\N	26	2023-09-01 13:51:55.260834
124	4	5	\N	2023-09-02 13:07:59.7091
125	7	10	\N	2023-09-02 15:40:21.240482
126	7	9	\N	2023-09-02 15:40:22.611539
\.


--
-- TOC entry 3348 (class 0 OID 16444)
-- Dependencies: 212
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts (id, "userId", post, "createdAt", "updatedAt") FROM stdin;
1	5	Hari gini ngantuk	2023-05-23 16:06:20.66+07	2023-05-23 16:06:20.66+07
2	5	Hari gini lapar	2023-05-23 16:08:22.479+07	2023-05-23 16:08:22.479+07
3	4	Pengen beli supra, tapi toyota	2023-05-23 16:09:16.336+07	2023-05-23 16:09:16.336+07
4	4	Pengen beli supra, tapi toyota	2023-06-15 17:08:36.94+07	2023-06-15 17:08:36.94+07
5	4	Iya juga ya	2023-07-23 19:22:31.315+07	2023-07-23 19:22:31.315+07
6	4	Coba buat post lagi	2023-08-26 18:46:11.942+07	2023-08-26 18:46:11.942+07
8	7	Bagaimana kabar hari ini ?	2023-09-01 13:39:55.214+07	2023-09-01 13:39:55.214+07
9	4	Indahnya cuaca di siang hari ini 😁	2023-09-01 13:42:27.798+07	2023-09-01 13:42:27.798+07
10	8	Halo apakabar ??	2023-09-01 13:51:00.189+07	2023-09-01 13:51:00.189+07
\.


--
-- TOC entry 3352 (class 0 OID 21597)
-- Dependencies: 216
-- Data for Name: relationships; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.relationships (id, "followerId", "followingId", "createdAt", "updatedAt") FROM stdin;
9	5	4	2023-08-23 14:44:53.24+07	2023-08-23 14:44:53.24+07
10	4	5	2023-08-23 14:46:28.09+07	2023-08-23 14:46:28.09+07
12	4	3	2023-08-23 14:53:10.038+07	2023-08-23 14:53:10.038+07
\.


--
-- TOC entry 3346 (class 0 OID 16428)
-- Dependencies: 210
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password, "createdAt", "updatedAt", profile_picture) FROM stdin;
1	rahmat	$2b$10$rcBfmRK7BPMGnr.D9QnZWuUbjUkimP9zrOS72DBxsmOxQYPKoITt2	2023-05-22 05:20:06.212+07	2023-05-22 05:20:06.212+07	\N
2	rahmat1	$2b$10$f7mrQqvNimYyEISyBr3anuNhq9dSBWXYIIqbsy5s0EwR71Xyo8AH2	2023-05-22 05:34:45.415+07	2023-05-22 05:34:45.415+07	\N
3	rahmat13	$2b$10$f7mrQqvNimYyEISyBr3anuNhq9dSBWXYIIqbsy5s0EwR71Xyo8AH2	2023-05-22 05:35:05.805+07	2023-05-22 05:35:05.805+07	\N
5	rahmat315	$2b$10$nMRztPvvcjlsp3EFG/LNUOt4WZQsAte..L.WXN7GGuRuFBFmrNSOK	2023-05-22 05:38:54.259+07	2023-05-22 05:38:54.259+07	\N
7	mattgan31	$2b$10$WxPY3UGpkQZlR.ozC4VKceOOgrrbDIyOPIFNuaO1N.pz44kLe8weO	2023-08-25 17:06:06.4+07	2023-08-25 17:06:06.4+07	\N
8	rahayu.ma	$2b$10$hseRajFadHJU1hJWeMdhEe4k9LXDCYnuoFSedgWvsNlmeDNwJICXq	2023-09-01 13:47:39.535+07	2023-09-01 13:47:39.535+07	\N
4	rahmat31	$2b$10$f7mrQqvNimYyEISyBr3anuNhq9dSBWXYIIqbsy5s0EwR71Xyo8AH2	2023-05-22 05:37:26.149+07	2023-05-22 05:37:26.149+07	1693632696139-416199247.png
\.


--
-- TOC entry 3366 (class 0 OID 0)
-- Dependencies: 213
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_id_seq', 26, true);


--
-- TOC entry 3367 (class 0 OID 0)
-- Dependencies: 217
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.likes_id_seq', 126, true);


--
-- TOC entry 3368 (class 0 OID 0)
-- Dependencies: 211
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_id_seq', 10, true);


--
-- TOC entry 3369 (class 0 OID 0)
-- Dependencies: 215
-- Name: relationships_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.relationships_id_seq', 12, true);


--
-- TOC entry 3370 (class 0 OID 0)
-- Dependencies: 209
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 13, true);


--
-- TOC entry 3195 (class 2606 OID 21507)
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- TOC entry 3193 (class 2606 OID 16449)
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- TOC entry 3197 (class 2606 OID 21602)
-- Name: relationships relationships_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relationships
    ADD CONSTRAINT relationships_pkey PRIMARY KEY (id);


--
-- TOC entry 3191 (class 2606 OID 16435)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3199 (class 2606 OID 38872)
-- Name: comments fk_comments_posts; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT fk_comments_posts FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- TOC entry 3200 (class 2606 OID 38867)
-- Name: comments fk_comments_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT fk_comments_users FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- TOC entry 3201 (class 2606 OID 38877)
-- Name: relationships fk_follower_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relationships
    ADD CONSTRAINT fk_follower_user FOREIGN KEY ("followerId") REFERENCES public.users(id);


--
-- TOC entry 3202 (class 2606 OID 38882)
-- Name: relationships fk_following_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relationships
    ADD CONSTRAINT fk_following_user FOREIGN KEY ("followingId") REFERENCES public.users(id);


--
-- TOC entry 3203 (class 2606 OID 38933)
-- Name: likes fk_likes_comments; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT fk_likes_comments FOREIGN KEY ("commentId") REFERENCES public.comments(id);


--
-- TOC entry 3204 (class 2606 OID 38928)
-- Name: likes fk_likes_posts; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT fk_likes_posts FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- TOC entry 3198 (class 2606 OID 38862)
-- Name: posts fk_posts_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT fk_posts_users FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- TOC entry 3205 (class 2606 OID 38938)
-- Name: likes fk_user_likes; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT fk_user_likes FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- TOC entry 3360 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2023-09-12 13:56:31

--
-- PostgreSQL database dump complete
--

