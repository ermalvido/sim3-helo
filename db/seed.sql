create table if not exists helo_user (
    user_id serial primary key,
    username varchar(20),
    password varchar(250),
    profile_picture text
);

create table if not exists post (
    post_id serial primary key,
    user_id int references helo_user(user_id),
    post_url text
);