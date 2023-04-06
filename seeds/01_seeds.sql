INSERT INTO properties (id, number_of_bedrooms, cost_per_night )
VALUES
(1, 'Condo', '2', '200'),
(2, 'House ', '3', '300'),
(3, 'Apartment', '1', '100');

INSERT INTO reservations (property_id, start_date, end_date)
VALUES
(1, '1', 'jan1 ', 'jan 7'),
(2, '2 ', 'feb 1', 'feb 7'),
(3, '3', 'March 1 ', 'march 7');

INSERT INTO property_reviews (property_id, rating, message)
VALUES
(1, '1', '7', 'Bad'),
(2, '2 ', '8', 'OK'),
(3, '3', '9', 'Good.');




