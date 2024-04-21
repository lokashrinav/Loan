PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE auth
(
    email    TEXT    not null on conflict fail,
    userid   integer not null
        constraint auth_pk
            primary key autoincrement,
    password TEXT    not null
, access_token TEXT, refresh_token TEXT);
CREATE TABLE user_data
(
    userid          integer not null
        constraint user_data_pk
            primary key
        constraint user_data_auth_userid_fk
            references auth,
    Address         TEXT    not null,
    profleimagelink TEXT,
    credit_score    integer not null
, first_name Text not null, last_name TEXT not null);
CREATE TABLE IF NOT EXISTS "listings"
(
    recipient_id integer not null
        constraint listings_auth_userid_fk
            references auth,
    amount       TEXT    not null,
    inr          TEXT,
    funded       TEXT,
    description  TEXT    not null,
    status       TEXT    not null,
    loan_id      integer not null
        constraint listings_pk
            primary key autoincrement,
    loan_term    integer not null
, recipient TEXT not null);
CREATE TABLE IF NOT EXISTS "loans"
(
    loan_id        integer not null
        constraint loans_pk
            primary key
        constraint loans_listings_loan_id_fk
            references listings,
    amount         TEXT    not null
        constraint loans_listings_amount_fk
            references listings (amount),
    funding        TEXT    not null
        constraint loans_listings_funded_fk
            references listings (funded),
    lender_id      TEXT,
    lender_amounts TEXT
);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('listings',0);
CREATE VIEW vw_listings_with_recipient AS
SELECT
    l.recipient_id,
    u.first_name || ' ' || u.last_name AS recipient,
    l.amount,
    l.inr,
    l.funded
FROM
    listings l
JOIN
    user_data u ON l.recipient_id = u.userid;
COMMIT;
