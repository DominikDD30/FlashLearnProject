insert into _user (email,password,active)
values
    ('testowy','$2a$12$x1cJPav.zu3RXNMhs7aVx.dYNGJ2AF6e1gmLpFabRI77gAA3I92fS','true'),
    ('admin','$2a$12$7CPlzqTCK7llm2BkehPuQO4V8hHT7hFs6xbda4KbMaOjq1nypviNa','true');

insert into flashcards_set (owner_id,name,last_time_used,share_code) values(1,'animals','2024-05-07','a051b424-591e-463c-ac43-eb5008745534');

insert into flashcard (flashcards_set_id,concept,definition,image_path) values(1,'spider','pająk','https://images.pexels.com/photos/40795/spider-macro-zebra-spider-insect-40795.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280');
insert into flashcard (flashcards_set_id,concept,definition,image_path)  values(1,'frog','żaba','https://images.pexels.com/photos/70083/frog-macro-amphibian-green-70083.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280');
insert into flashcard (flashcards_set_id,concept,definition,image_path)  values(1,'horse','koń','https://images.pexels.com/photos/1996333/pexels-photo-1996333.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280');
insert into flashcard (flashcards_set_id,concept,definition,image_path)  values(1,'snake','wąż','https://images.pexels.com/photos/34426/snake-rainbow-boa-reptile-scale.jpg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280');
insert into flashcard (flashcards_set_id,concept,definition,image_path)  values(1,'cow','krowa','https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280');
insert into flashcard (flashcards_set_id,concept,definition,image_path)  values(1,'fish','ryba','https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280');
insert into flashcard (flashcards_set_id,concept,definition,image_path)  values(1,'cat','kot','https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280');
insert into flashcard (flashcards_set_id,concept,definition,image_path)  values(1,'bird','ptak','https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280');
insert into flashcard (flashcards_set_id,concept,definition,image_path)  values(1,'whale','wieloryb','https://images.pexels.com/photos/892548/pexels-photo-892548.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280');
insert into flashcard (flashcards_set_id,concept,definition,image_path)  values(1,'dragon','smok','https://images.pexels.com/photos/208326/pexels-photo-208326.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280');


insert into quiz_set (owner_id,name,last_time_used,share_code) values(1,'animals world','2024-05-07','10fd0c28-7f38-4c33-97c0-e4067256ea39');
insert into quiz (quiz_set_id,question) values (1,'cheetah  run even as fast as 110 km per hour');
INSERT INTO quiz (quiz_set_id,question) VALUES (1, 'Elephants can swim');
INSERT INTO quiz (quiz_set_id,question) VALUES (1, 'Spiders have six legs');
INSERT INTO quiz (quiz_set_id,question) VALUES (1, 'Bats are blind');
INSERT INTO quiz (quiz_set_id,question) VALUES (1, 'The blue whale is the largest mammal on Earth');
INSERT INTO quiz (quiz_set_id,question) VALUES (1, 'Snakes are deaf');
INSERT INTO quiz (quiz_set_id,question) VALUES (1, 'Penguins can fly');
INSERT INTO quiz (quiz_set_id,question) VALUES (1, 'Greenland shark is the oldest known living animal');
INSERT INTO quiz (quiz_set_id,question) VALUES (1, 'Dolphins sleep with one eye open');
INSERT INTO quiz (quiz_set_id,question) VALUES (1, 'Bats are the only mammals that can truly fly');

insert into answer (quiz_id,value,is_correct)  values(1,'yes',true);
insert into answer (quiz_id,value,is_correct)  values(1,'no',false);
insert into answer (quiz_id,value,is_correct)  values(2,'yes',true);
insert into answer (quiz_id,value,is_correct)  values(2,'no',false);
insert into answer (quiz_id,value,is_correct)  values(3,'yes',false);
insert into answer (quiz_id,value,is_correct)  values(3,'no',true);
insert into answer (quiz_id,value,is_correct)  values(4,'yes',false);
insert into answer (quiz_id,value,is_correct)  values(4,'no',true);
insert into answer (quiz_id,value,is_correct)  values(5,'yes',true);
insert into answer (quiz_id,value,is_correct)  values(5,'no',false);
insert into answer (quiz_id,value,is_correct)  values(6,'yes',false);
insert into answer (quiz_id,value,is_correct)  values(6,'no',true);
insert into answer (quiz_id,value,is_correct)  values(7,'yes',false);
insert into answer (quiz_id,value,is_correct)  values(7,'no',true);
insert into answer (quiz_id,value,is_correct)  values(8,'yes',true);
insert into answer (quiz_id,value,is_correct)  values(8,'no',false);
insert into answer (quiz_id,value,is_correct)  values(9,'yes',true);
insert into answer (quiz_id,value,is_correct)  values(9,'no',false);
insert into answer (quiz_id,value,is_correct)  values(10,'yes',true);
insert into answer (quiz_id,value,is_correct)  values(10,'no',false);

