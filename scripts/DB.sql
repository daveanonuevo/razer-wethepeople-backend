CREATE TABLE IF NOT EXISTS public.money (
    uuid UUID NOT NULL UNIQUE,
    number TEXT NOT NULL,
    type TEXT NOT NULL,
    amount TEXT NOT NULL,


    PRIMARY KEY (uuid)
);

CREATE TABLE IF NOT EXISTS public.events (
    uuid uuid NOT NULL UNIQUE,
    host_number TEXT NOT NULL,
    copayer TEXT NOT NULL,

    PRIMARY KEY (uuid)
);

CREATE TABLE IF NOT EXISTS public.spendings (
    uuid uuid NOT NULL UNIQUE,
    number TEXT NOT NULL,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    budget TEXT NOT NULL,


    PRIMARY KEY (uuid)
);
