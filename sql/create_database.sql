DROP DATABASE audionet;
CREATE DATABASE audionet;

use audionet;

CREATE TABLE users (
	user_id int auto_increment,
	username varchar(20) not null,
	password varchar(32) not null,
	email_id varchar(20) not null,
	profile_pic varchar(50) not null,
	gender varchar(1) not null,
	DOB date not null,
	verified int not null,
	location varchar(100) not null,
	phone_number bigint not null,
	
	primary key (user_id)
);


CREATE TABLE songs (
	song_id int auto_increment,
	user_id int not null,
	audio_url varchar(50) not null,
	genre varchar(20) not null,
	duration time not null,
	release_date date not null,
	lang varchar(10) not null,
	title varchar(50) not null,
	upload int not null,
	stream int not null,

	primary key (song_id),
	foreign key (user_id) references users(user_id)
);


CREATE TABLE feedback (
	user_id int not null,
	subject varchar(50) not null,
	content varchar(200) not null,
	
	primary key (user_id, subject),
	foreign key (user_id) references users(user_id)
);

CREATE TABLE shares (
	user_id int not null,
	song_id int not null,
	
	foreign key (user_id) references users(user_id),
	foreign key (song_id) references songs(song_id),
	primary key (user_id, song_id)
);

CREATE TABLE comments (
	user_id int not null,
	song_id int not null,
	content text not null,
	
	foreign key (user_id) references users(user_id),
	foreign key (song_id) references songs(song_id),
	primary key (user_id, song_id)
);

CREATE TABLE listens (
	user_id int not null,
	song_id int not null,
	listened_at date not null,
	
	foreign key (user_id) references users(user_id),
	foreign key (song_id) references songs(song_id),
	primary key (user_id, song_id)
);

CREATE TABLE likes (
	user_id int not null,
	song_id int not null,
	
	foreign key (user_id) references users(user_id),
	foreign key (song_id) references songs(song_id),
	primary key (user_id, song_id)
);

CREATE TABLE playlist (
	playlist_id int auto_increment,
	user_id int not null,
	
	primary key (playlist_id),
	foreign key (user_id) references users(user_id)
);

CREATE TABLE playlist_share (
	playlist_id int not null,
	user_id int not null,
	
	foreign key (user_id) references users(user_id),
	foreign key (playlist_id) references playlist(playlist_id),
	primary key (user_id, playlist_id)
);

CREATE TABLE playlist_contains (
	playlist_id int not null,
	song_id int not null,
	
	foreign key (song_id) references songs(song_id),
	foreign key (playlist_id) references playlist(playlist_id),
	primary key (song_id, playlist_id)
);
