export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface PerfumeReviewStats {
  count: number;
  averageRating: number;
  ratingBreakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export const PERFUME_REVIEWS: Record<string, Review[]> = {
  "calantha": [
    {
      "id": "rev-calantha-001",
      "author": "Tarun Mathur",
      "rating": 5,
      "date": "Yesterday",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Calantha for special evenings and the compliments haven't stopped. The dry down notes of blooming jasmine and fresh rose linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-calantha-002",
      "author": "Siddharth Verma",
      "rating": 5,
      "date": "2 days ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with blooming jasmine is so crisp and invigorating, transitioning smoothly into warm sandalwood and golden amber. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-calantha-003",
      "author": "Rohan Mehta",
      "rating": 4,
      "date": "3 days ago",
      "title": "Very high quality formulation and beautiful engraving",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Calantha has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-calantha-004",
      "author": "Nidhi Agarwal",
      "rating": 5,
      "date": "4 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating blooming jasmine and lily of the valley notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-calantha-005",
      "author": "Radhika Murthy",
      "rating": 5,
      "date": "5 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-calantha-006",
      "author": "Rahul Saxena",
      "rating": 5,
      "date": "6 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Calantha after reading about the notes (blooming jasmine, fresh rose, and warm sandalwood). It exceeded all my expectations! Highly recommend for anyone looking for floral elegance.",
      "verified": true
    },
    {
      "id": "rev-calantha-007",
      "author": "Tarun Mathur",
      "rating": 5,
      "date": "1 week ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Calantha is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of blooming jasmine and warm sandalwood is pure art.",
      "verified": true
    },
    {
      "id": "rev-calantha-008",
      "author": "Kabir Sen",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of blooming jasmine are top tier.",
      "verified": true
    },
    {
      "id": "rev-calantha-009",
      "author": "Simran Gill",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of lily of the valley combined with blooming jasmine create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-calantha-010",
      "author": "Farhan Alvi",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Calantha is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-calantha-011",
      "author": "Rishabh Jain",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The blooming jasmine accord opens up beautifully without any alcohol blast, and settles into deep fresh rose.",
      "verified": true
    },
    {
      "id": "rev-calantha-012",
      "author": "Ananya Roy",
      "rating": 5,
      "date": "1 month ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-calantha-013",
      "author": "Arjun Deshmukh",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love luxurious sillage, do not think twice. The balance of blooming jasmine and golden amber is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-calantha-014",
      "author": "Aditya Joshi",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Calantha gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-calantha-015",
      "author": "Ayaan Qureshi",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of blooming jasmine and fresh rose on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-calantha-016",
      "author": "Rohan Mehta",
      "rating": 5,
      "date": "2 months ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of blooming jasmine and fresh rose all day long.",
      "verified": true
    },
    {
      "id": "rev-calantha-017",
      "author": "Ananya Roy",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The blooming jasmine opening is bright and luxurious, leading into warm sandalwood with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-calantha-018",
      "author": "Geetika Chopra",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Calantha easily holds its own against top European houses. Beautifully blended with blooming jasmine, golden amber and lily of the valley.",
      "verified": true
    },
    {
      "id": "rev-calantha-019",
      "author": "Alok Sengupta",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of blooming jasmine makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-calantha-020",
      "author": "Sonali Hegde",
      "rating": 5,
      "date": "4 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The blooming jasmine note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-calantha-021",
      "author": "Jhanvi Mittal",
      "rating": 5,
      "date": "5 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Calantha for special evenings and the compliments haven't stopped. The dry down notes of blooming jasmine and fresh rose linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-calantha-022",
      "author": "Arjun Deshmukh",
      "rating": 5,
      "date": "Yesterday",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with blooming jasmine is so crisp and invigorating, transitioning smoothly into warm sandalwood and golden amber. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-calantha-023",
      "author": "Bhavna Kaushik",
      "rating": 4,
      "date": "2 days ago",
      "title": "Very high quality formulation and beautiful engraving",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Calantha has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-calantha-024",
      "author": "Neha Singhania",
      "rating": 5,
      "date": "3 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating blooming jasmine and lily of the valley notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-calantha-025",
      "author": "Varun Chauhan",
      "rating": 5,
      "date": "4 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-calantha-026",
      "author": "Varun Chauhan",
      "rating": 5,
      "date": "5 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Calantha after reading about the notes (blooming jasmine, fresh rose, and warm sandalwood). It exceeded all my expectations! Highly recommend for anyone looking for floral elegance.",
      "verified": true
    },
    {
      "id": "rev-calantha-027",
      "author": "Rahul Saxena",
      "rating": 5,
      "date": "6 days ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Calantha is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of blooming jasmine and warm sandalwood is pure art.",
      "verified": true
    },
    {
      "id": "rev-calantha-028",
      "author": "Gaurav Trivedi",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of blooming jasmine are top tier.",
      "verified": true
    },
    {
      "id": "rev-calantha-029",
      "author": "Ayaan Qureshi",
      "rating": 5,
      "date": "1 week ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of lily of the valley combined with blooming jasmine create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-calantha-030",
      "author": "Geetika Chopra",
      "rating": 4,
      "date": "2 weeks ago",
      "title": "Outstanding fragrance, strong for the first 8 hours",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Calantha is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-calantha-031",
      "author": "Uday Shenoy",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The blooming jasmine accord opens up beautifully without any alcohol blast, and settles into deep fresh rose.",
      "verified": true
    },
    {
      "id": "rev-calantha-032",
      "author": "Chirag Singhal",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-calantha-033",
      "author": "Tushar Banerjee",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love luxurious sillage, do not think twice. The balance of blooming jasmine and golden amber is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-calantha-034",
      "author": "Anjali Bose",
      "rating": 5,
      "date": "1 month ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Calantha gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-calantha-035",
      "author": "Aarav Sharma",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of blooming jasmine and fresh rose on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-calantha-036",
      "author": "Simran Gill",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of blooming jasmine and fresh rose all day long.",
      "verified": true
    },
    {
      "id": "rev-calantha-037",
      "author": "Deepak Rao",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The blooming jasmine opening is bright and luxurious, leading into warm sandalwood with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-calantha-038",
      "author": "Zoya Merchant",
      "rating": 5,
      "date": "2 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Calantha easily holds its own against top European houses. Beautifully blended with blooming jasmine, golden amber and lily of the valley.",
      "verified": true
    },
    {
      "id": "rev-calantha-039",
      "author": "Smriti Pandey",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of blooming jasmine makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-calantha-040",
      "author": "Yashvardhan Kulkarni",
      "rating": 5,
      "date": "3 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The blooming jasmine note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-calantha-041",
      "author": "Karan Bhasin",
      "rating": 4,
      "date": "4 months ago",
      "title": "Great scent & projection, wish I got the 50ml earlier",
      "comment": "I have been wearing Calantha for special evenings and the compliments haven't stopped. The dry down notes of blooming jasmine and fresh rose linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-calantha-042",
      "author": "Payal Ahuja",
      "rating": 5,
      "date": "5 months ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with blooming jasmine is so crisp and invigorating, transitioning smoothly into warm sandalwood and golden amber. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-calantha-043",
      "author": "Alok Sengupta",
      "rating": 5,
      "date": "Yesterday",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Calantha has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-calantha-044",
      "author": "Sunil Goswami",
      "rating": 5,
      "date": "2 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating blooming jasmine and lily of the valley notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-calantha-045",
      "author": "Shweta Khandelwal",
      "rating": 5,
      "date": "3 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-calantha-046",
      "author": "Rishabh Jain",
      "rating": 5,
      "date": "4 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Calantha after reading about the notes (blooming jasmine, fresh rose, and warm sandalwood). It exceeded all my expectations! Highly recommend for anyone looking for floral elegance.",
      "verified": true
    },
    {
      "id": "rev-calantha-047",
      "author": "Meera Iyer",
      "rating": 5,
      "date": "5 days ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Calantha is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of blooming jasmine and warm sandalwood is pure art.",
      "verified": true
    },
    {
      "id": "rev-calantha-048",
      "author": "Vandana Sethi",
      "rating": 5,
      "date": "6 days ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of blooming jasmine are top tier.",
      "verified": true
    },
    {
      "id": "rev-calantha-049",
      "author": "Akash Ganguly",
      "rating": 5,
      "date": "1 week ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of lily of the valley combined with blooming jasmine create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-calantha-050",
      "author": "Akash Ganguly",
      "rating": 5,
      "date": "1 week ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Calantha is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-calantha-051",
      "author": "Pallavi Menon",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The blooming jasmine accord opens up beautifully without any alcohol blast, and settles into deep fresh rose.",
      "verified": true
    },
    {
      "id": "rev-calantha-052",
      "author": "Neha Singhania",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    }
  ],
  "deep-crush": [
    {
      "id": "rev-deep-crush-001",
      "author": "Samir Bajaj",
      "rating": 5,
      "date": "Yesterday",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Deep Crush for special evenings and the compliments haven't stopped. The dry down notes of French lavender and warm tobacco leaf linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-002",
      "author": "Shreya Dasgupta",
      "rating": 5,
      "date": "2 days ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with French lavender is so crisp and invigorating, transitioning smoothly into spiced woods and amber accord. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-003",
      "author": "Mihir Bhatt",
      "rating": 4,
      "date": "3 days ago",
      "title": "Very high quality formulation and beautiful engraving",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Deep Crush has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-004",
      "author": "Anjali Bose",
      "rating": 5,
      "date": "4 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating French lavender and sandalwood notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-005",
      "author": "Aishwarya Menon",
      "rating": 5,
      "date": "5 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-deep-crush-006",
      "author": "Arjun Deshmukh",
      "rating": 5,
      "date": "6 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Deep Crush after reading about the notes (French lavender, warm tobacco leaf, and spiced woods). It exceeded all my expectations! Highly recommend for anyone looking for masculine cozy warmth.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-007",
      "author": "Nikhil Bhatia",
      "rating": 5,
      "date": "1 week ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Deep Crush is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of French lavender and spiced woods is pure art.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-008",
      "author": "Siddharth Verma",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of French lavender are top tier.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-009",
      "author": "Akash Ganguly",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of sandalwood combined with French lavender create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-010",
      "author": "Rhea Mukherjee",
      "rating": 4,
      "date": "2 weeks ago",
      "title": "Outstanding fragrance, strong for the first 8 hours",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Deep Crush is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-011",
      "author": "Karan Bhasin",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The French lavender accord opens up beautifully without any alcohol blast, and settles into deep warm tobacco leaf.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-012",
      "author": "Rhea Mukherjee",
      "rating": 5,
      "date": "1 month ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-013",
      "author": "Simran Gill",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love intoxicating date night scent, do not think twice. The balance of French lavender and amber accord is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-014",
      "author": "Anjali Bose",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Deep Crush gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-015",
      "author": "Manish Bhardwaj",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of French lavender and warm tobacco leaf on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-016",
      "author": "Ayaan Qureshi",
      "rating": 5,
      "date": "2 months ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of French lavender and warm tobacco leaf all day long.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-017",
      "author": "Kavya Patel",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The French lavender opening is bright and luxurious, leading into spiced woods with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-018",
      "author": "Tanvi Kapoor",
      "rating": 4,
      "date": "3 months ago",
      "title": "Outstanding fragrance, strong for the first 8 hours",
      "comment": "I collect niche perfumes and Deep Crush easily holds its own against top European houses. Beautifully blended with French lavender, amber accord and sandalwood.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-019",
      "author": "Bhavna Kaushik",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of French lavender makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-020",
      "author": "Rishabh Jain",
      "rating": 5,
      "date": "4 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The French lavender note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-021",
      "author": "Bhavna Kaushik",
      "rating": 5,
      "date": "5 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Deep Crush for special evenings and the compliments haven't stopped. The dry down notes of French lavender and warm tobacco leaf linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-022",
      "author": "Farhan Alvi",
      "rating": 4,
      "date": "Yesterday",
      "title": "Outstanding fragrance, strong for the first 8 hours",
      "comment": "The opening with French lavender is so crisp and invigorating, transitioning smoothly into spiced woods and amber accord. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-023",
      "author": "Priya Nair",
      "rating": 5,
      "date": "2 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Deep Crush has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-024",
      "author": "Yashvardhan Kulkarni",
      "rating": 5,
      "date": "3 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating French lavender and sandalwood notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-025",
      "author": "Rohan Mehta",
      "rating": 5,
      "date": "4 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-deep-crush-026",
      "author": "Priya Nair",
      "rating": 4,
      "date": "5 days ago",
      "title": "Outstanding fragrance, strong for the first 8 hours",
      "comment": "Blind bought Deep Crush after reading about the notes (French lavender, warm tobacco leaf, and spiced woods). It exceeded all my expectations! Highly recommend for anyone looking for masculine cozy warmth.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-027",
      "author": "Zoya Merchant",
      "rating": 5,
      "date": "6 days ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Deep Crush is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of French lavender and spiced woods is pure art.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-028",
      "author": "Jhanvi Mittal",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of French lavender are top tier.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-029",
      "author": "Mihir Bhatt",
      "rating": 5,
      "date": "1 week ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of sandalwood combined with French lavender create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-030",
      "author": "Kritika Soni",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Deep Crush is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-031",
      "author": "Vikramaditya K.",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The French lavender accord opens up beautifully without any alcohol blast, and settles into deep warm tobacco leaf.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-032",
      "author": "Farhan Alvi",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-033",
      "author": "Rajat Mittal",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love intoxicating date night scent, do not think twice. The balance of French lavender and amber accord is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-034",
      "author": "Yashvardhan Kulkarni",
      "rating": 5,
      "date": "1 month ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Deep Crush gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-035",
      "author": "Divya Pillai",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of French lavender and warm tobacco leaf on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-036",
      "author": "Smriti Pandey",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of French lavender and warm tobacco leaf all day long.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-037",
      "author": "Natasha Khurana",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The French lavender opening is bright and luxurious, leading into spiced woods with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-038",
      "author": "Natasha Khurana",
      "rating": 5,
      "date": "2 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Deep Crush easily holds its own against top European houses. Beautifully blended with French lavender, amber accord and sandalwood.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-039",
      "author": "Shweta Khandelwal",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of French lavender makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-040",
      "author": "Geetika Chopra",
      "rating": 5,
      "date": "3 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The French lavender note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-041",
      "author": "Sunil Goswami",
      "rating": 5,
      "date": "4 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Deep Crush for special evenings and the compliments haven't stopped. The dry down notes of French lavender and warm tobacco leaf linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-042",
      "author": "Aarav Sharma",
      "rating": 5,
      "date": "5 months ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with French lavender is so crisp and invigorating, transitioning smoothly into spiced woods and amber accord. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-043",
      "author": "Pallavi Menon",
      "rating": 5,
      "date": "Yesterday",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Deep Crush has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-044",
      "author": "Jhanvi Mittal",
      "rating": 5,
      "date": "2 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating French lavender and sandalwood notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-045",
      "author": "Sanya Goel",
      "rating": 5,
      "date": "3 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-deep-crush-046",
      "author": "Sanya Goel",
      "rating": 5,
      "date": "4 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Deep Crush after reading about the notes (French lavender, warm tobacco leaf, and spiced woods). It exceeded all my expectations! Highly recommend for anyone looking for masculine cozy warmth.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-047",
      "author": "Kabir Sen",
      "rating": 5,
      "date": "5 days ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Deep Crush is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of French lavender and spiced woods is pure art.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-048",
      "author": "Ayaan Qureshi",
      "rating": 5,
      "date": "6 days ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of French lavender are top tier.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-049",
      "author": "Deepak Rao",
      "rating": 5,
      "date": "1 week ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of sandalwood combined with French lavender create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-050",
      "author": "Devendra Rathore",
      "rating": 5,
      "date": "1 week ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Deep Crush is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-051",
      "author": "Simran Gill",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The French lavender accord opens up beautifully without any alcohol blast, and settles into deep warm tobacco leaf.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-052",
      "author": "Arjun Deshmukh",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-053",
      "author": "Varun Chauhan",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love intoxicating date night scent, do not think twice. The balance of French lavender and amber accord is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-deep-crush-054",
      "author": "Shweta Khandelwal",
      "rating": 5,
      "date": "1 month ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Deep Crush gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    }
  ],
  "herrlich": [
    {
      "id": "rev-herrlich-001",
      "author": "Shweta Khandelwal",
      "rating": 5,
      "date": "Yesterday",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Herrlich for special evenings and the compliments haven't stopped. The dry down notes of Calabrian bergamot and luscious peach linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-herrlich-002",
      "author": "Deepak Rao",
      "rating": 5,
      "date": "2 days ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with Calabrian bergamot is so crisp and invigorating, transitioning smoothly into dark cocoa chocolate and white florals. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-herrlich-003",
      "author": "Rishabh Jain",
      "rating": 5,
      "date": "3 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Herrlich has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-herrlich-004",
      "author": "Avni Reddy",
      "rating": 5,
      "date": "4 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating Calabrian bergamot and creamy musk notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-herrlich-005",
      "author": "Nidhi Agarwal",
      "rating": 5,
      "date": "5 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-herrlich-006",
      "author": "Pooja Chawla",
      "rating": 5,
      "date": "6 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Herrlich after reading about the notes (Calabrian bergamot, luscious peach, and dark cocoa chocolate). It exceeded all my expectations! Highly recommend for anyone looking for fruity richness.",
      "verified": true
    },
    {
      "id": "rev-herrlich-007",
      "author": "Shweta Khandelwal",
      "rating": 5,
      "date": "1 week ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Herrlich is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of Calabrian bergamot and dark cocoa chocolate is pure art.",
      "verified": true
    },
    {
      "id": "rev-herrlich-008",
      "author": "Vandana Sethi",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of Calabrian bergamot are top tier.",
      "verified": true
    },
    {
      "id": "rev-herrlich-009",
      "author": "Ayaan Qureshi",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of creamy musk combined with Calabrian bergamot create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-herrlich-010",
      "author": "Tushar Banerjee",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Herrlich is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-herrlich-011",
      "author": "Farhan Alvi",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The Calabrian bergamot accord opens up beautifully without any alcohol blast, and settles into deep luscious peach.",
      "verified": true
    },
    {
      "id": "rev-herrlich-012",
      "author": "Akash Ganguly",
      "rating": 5,
      "date": "1 month ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-herrlich-013",
      "author": "Alok Sengupta",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love gourmand decadence, do not think twice. The balance of Calabrian bergamot and white florals is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-herrlich-014",
      "author": "Siddharth Verma",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Herrlich gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-herrlich-015",
      "author": "Simran Gill",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of Calabrian bergamot and luscious peach on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-herrlich-016",
      "author": "Rahul Saxena",
      "rating": 5,
      "date": "2 months ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of Calabrian bergamot and luscious peach all day long.",
      "verified": true
    },
    {
      "id": "rev-herrlich-017",
      "author": "Divya Pillai",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The Calabrian bergamot opening is bright and luxurious, leading into dark cocoa chocolate with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-herrlich-018",
      "author": "Meera Iyer",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Herrlich easily holds its own against top European houses. Beautifully blended with Calabrian bergamot, white florals and creamy musk.",
      "verified": true
    },
    {
      "id": "rev-herrlich-019",
      "author": "Ishaan Malhotra",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of Calabrian bergamot makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-herrlich-020",
      "author": "Zoya Merchant",
      "rating": 5,
      "date": "4 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The Calabrian bergamot note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-herrlich-021",
      "author": "Geetika Chopra",
      "rating": 5,
      "date": "5 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Herrlich for special evenings and the compliments haven't stopped. The dry down notes of Calabrian bergamot and luscious peach linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-herrlich-022",
      "author": "Smriti Pandey",
      "rating": 5,
      "date": "Yesterday",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with Calabrian bergamot is so crisp and invigorating, transitioning smoothly into dark cocoa chocolate and white florals. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-herrlich-023",
      "author": "Samir Bajaj",
      "rating": 5,
      "date": "2 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Herrlich has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-herrlich-024",
      "author": "Kabir Sen",
      "rating": 5,
      "date": "3 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating Calabrian bergamot and creamy musk notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-herrlich-025",
      "author": "Ritu Agrawal",
      "rating": 5,
      "date": "4 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-herrlich-026",
      "author": "Chirag Singhal",
      "rating": 5,
      "date": "5 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Herrlich after reading about the notes (Calabrian bergamot, luscious peach, and dark cocoa chocolate). It exceeded all my expectations! Highly recommend for anyone looking for fruity richness.",
      "verified": true
    },
    {
      "id": "rev-herrlich-027",
      "author": "Pranav Vashisht",
      "rating": 5,
      "date": "6 days ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Herrlich is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of Calabrian bergamot and dark cocoa chocolate is pure art.",
      "verified": true
    },
    {
      "id": "rev-herrlich-028",
      "author": "Vikramaditya K.",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of Calabrian bergamot are top tier.",
      "verified": true
    },
    {
      "id": "rev-herrlich-029",
      "author": "Radhika Murthy",
      "rating": 5,
      "date": "1 week ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of creamy musk combined with Calabrian bergamot create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-herrlich-030",
      "author": "Rahul Saxena",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Herrlich is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-herrlich-031",
      "author": "Radhika Murthy",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The Calabrian bergamot accord opens up beautifully without any alcohol blast, and settles into deep luscious peach.",
      "verified": true
    },
    {
      "id": "rev-herrlich-032",
      "author": "Gaurav Trivedi",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-herrlich-033",
      "author": "Anjali Bose",
      "rating": 4,
      "date": "1 month ago",
      "title": "Great scent & projection, wish I got the 50ml earlier",
      "comment": "If you love gourmand decadence, do not think twice. The balance of Calabrian bergamot and white florals is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-herrlich-034",
      "author": "Uday Shenoy",
      "rating": 5,
      "date": "1 month ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Herrlich gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-herrlich-035",
      "author": "Swati Nambiar",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of Calabrian bergamot and luscious peach on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-herrlich-036",
      "author": "Aditya Joshi",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of Calabrian bergamot and luscious peach all day long.",
      "verified": true
    },
    {
      "id": "rev-herrlich-037",
      "author": "Mihir Bhatt",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The Calabrian bergamot opening is bright and luxurious, leading into dark cocoa chocolate with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-herrlich-038",
      "author": "Rohan Mehta",
      "rating": 5,
      "date": "2 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Herrlich easily holds its own against top European houses. Beautifully blended with Calabrian bergamot, white florals and creamy musk.",
      "verified": true
    },
    {
      "id": "rev-herrlich-039",
      "author": "Rishabh Jain",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of Calabrian bergamot makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-herrlich-040",
      "author": "Tushar Banerjee",
      "rating": 5,
      "date": "3 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The Calabrian bergamot note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-herrlich-041",
      "author": "Kunal Grover",
      "rating": 5,
      "date": "4 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Herrlich for special evenings and the compliments haven't stopped. The dry down notes of Calabrian bergamot and luscious peach linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-herrlich-042",
      "author": "Ananya Roy",
      "rating": 5,
      "date": "5 months ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with Calabrian bergamot is so crisp and invigorating, transitioning smoothly into dark cocoa chocolate and white florals. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-herrlich-043",
      "author": "Priya Nair",
      "rating": 5,
      "date": "Yesterday",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Herrlich has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-herrlich-044",
      "author": "Arjun Deshmukh",
      "rating": 5,
      "date": "2 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating Calabrian bergamot and creamy musk notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-herrlich-045",
      "author": "Nikhil Bhatia",
      "rating": 5,
      "date": "3 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-herrlich-046",
      "author": "Manish Bhardwaj",
      "rating": 5,
      "date": "4 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Herrlich after reading about the notes (Calabrian bergamot, luscious peach, and dark cocoa chocolate). It exceeded all my expectations! Highly recommend for anyone looking for fruity richness.",
      "verified": true
    }
  ],
  "midnight": [
    {
      "id": "rev-midnight-001",
      "author": "Zoya Merchant",
      "rating": 5,
      "date": "Yesterday",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Midnight for special evenings and the compliments haven't stopped. The dry down notes of blackcurrant and bergamot linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-midnight-002",
      "author": "Rhea Mukherjee",
      "rating": 5,
      "date": "2 days ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with blackcurrant is so crisp and invigorating, transitioning smoothly into tuberose and warm vanilla. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-midnight-003",
      "author": "Pooja Chawla",
      "rating": 5,
      "date": "3 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Midnight has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-midnight-004",
      "author": "Vikramaditya K.",
      "rating": 5,
      "date": "4 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating blackcurrant and velvet musk notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-midnight-005",
      "author": "Uday Shenoy",
      "rating": 5,
      "date": "5 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-midnight-006",
      "author": "Kabir Sen",
      "rating": 5,
      "date": "6 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Midnight after reading about the notes (blackcurrant, bergamot, and tuberose). It exceeded all my expectations! Highly recommend for anyone looking for sensual allure.",
      "verified": true
    },
    {
      "id": "rev-midnight-007",
      "author": "Siddharth Verma",
      "rating": 5,
      "date": "1 week ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Midnight is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of blackcurrant and tuberose is pure art.",
      "verified": true
    },
    {
      "id": "rev-midnight-008",
      "author": "Meera Iyer",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of blackcurrant are top tier.",
      "verified": true
    },
    {
      "id": "rev-midnight-009",
      "author": "Aditya Joshi",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of velvet musk combined with blackcurrant create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-midnight-010",
      "author": "Vikramaditya K.",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Midnight is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-midnight-011",
      "author": "Alok Sengupta",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The blackcurrant accord opens up beautifully without any alcohol blast, and settles into deep bergamot.",
      "verified": true
    },
    {
      "id": "rev-midnight-012",
      "author": "Jhanvi Mittal",
      "rating": 5,
      "date": "1 month ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-midnight-013",
      "author": "Pallavi Menon",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love mysterious evening trail, do not think twice. The balance of blackcurrant and warm vanilla is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-midnight-014",
      "author": "Divya Pillai",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Midnight gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-midnight-015",
      "author": "Akash Ganguly",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of blackcurrant and bergamot on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-midnight-016",
      "author": "Girish Sundaram",
      "rating": 5,
      "date": "2 months ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of blackcurrant and bergamot all day long.",
      "verified": true
    },
    {
      "id": "rev-midnight-017",
      "author": "Tanvi Kapoor",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The blackcurrant opening is bright and luxurious, leading into tuberose with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-midnight-018",
      "author": "Kunal Grover",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Midnight easily holds its own against top European houses. Beautifully blended with blackcurrant, warm vanilla and velvet musk.",
      "verified": true
    },
    {
      "id": "rev-midnight-019",
      "author": "Ritu Agrawal",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of blackcurrant makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-midnight-020",
      "author": "Payal Ahuja",
      "rating": 5,
      "date": "4 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The blackcurrant note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-midnight-021",
      "author": "Samir Bajaj",
      "rating": 5,
      "date": "5 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Midnight for special evenings and the compliments haven't stopped. The dry down notes of blackcurrant and bergamot linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-midnight-022",
      "author": "Simran Gill",
      "rating": 5,
      "date": "Yesterday",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with blackcurrant is so crisp and invigorating, transitioning smoothly into tuberose and warm vanilla. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-midnight-023",
      "author": "Mihir Bhatt",
      "rating": 5,
      "date": "2 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Midnight has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-midnight-024",
      "author": "Pranav Vashisht",
      "rating": 5,
      "date": "3 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating blackcurrant and velvet musk notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-midnight-025",
      "author": "Ananya Roy",
      "rating": 5,
      "date": "4 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-midnight-026",
      "author": "Avni Reddy",
      "rating": 5,
      "date": "5 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Midnight after reading about the notes (blackcurrant, bergamot, and tuberose). It exceeded all my expectations! Highly recommend for anyone looking for sensual allure.",
      "verified": true
    },
    {
      "id": "rev-midnight-027",
      "author": "Deepak Rao",
      "rating": 5,
      "date": "6 days ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Midnight is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of blackcurrant and tuberose is pure art.",
      "verified": true
    },
    {
      "id": "rev-midnight-028",
      "author": "Meera Iyer",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of blackcurrant are top tier.",
      "verified": true
    },
    {
      "id": "rev-midnight-029",
      "author": "Natasha Khurana",
      "rating": 5,
      "date": "1 week ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of velvet musk combined with blackcurrant create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-midnight-030",
      "author": "Rahul Saxena",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Midnight is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-midnight-031",
      "author": "Priya Nair",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The blackcurrant accord opens up beautifully without any alcohol blast, and settles into deep bergamot.",
      "verified": true
    },
    {
      "id": "rev-midnight-032",
      "author": "Priya Nair",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-midnight-033",
      "author": "Karan Bhasin",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love mysterious evening trail, do not think twice. The balance of blackcurrant and warm vanilla is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-midnight-034",
      "author": "Rohan Mehta",
      "rating": 5,
      "date": "1 month ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Midnight gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-midnight-035",
      "author": "Kritika Soni",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of blackcurrant and bergamot on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-midnight-036",
      "author": "Pooja Chawla",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of blackcurrant and bergamot all day long.",
      "verified": true
    },
    {
      "id": "rev-midnight-037",
      "author": "Kabir Sen",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The blackcurrant opening is bright and luxurious, leading into tuberose with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-midnight-038",
      "author": "Rahul Saxena",
      "rating": 5,
      "date": "2 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Midnight easily holds its own against top European houses. Beautifully blended with blackcurrant, warm vanilla and velvet musk.",
      "verified": true
    },
    {
      "id": "rev-midnight-039",
      "author": "Geetika Chopra",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of blackcurrant makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-midnight-040",
      "author": "Rhea Mukherjee",
      "rating": 5,
      "date": "3 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The blackcurrant note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-midnight-041",
      "author": "Sonali Hegde",
      "rating": 4,
      "date": "4 months ago",
      "title": "Great scent & projection, wish I got the 50ml earlier",
      "comment": "I have been wearing Midnight for special evenings and the compliments haven't stopped. The dry down notes of blackcurrant and bergamot linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-midnight-042",
      "author": "Yashvardhan Kulkarni",
      "rating": 5,
      "date": "5 months ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with blackcurrant is so crisp and invigorating, transitioning smoothly into tuberose and warm vanilla. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-midnight-043",
      "author": "Karan Bhasin",
      "rating": 5,
      "date": "Yesterday",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Midnight has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-midnight-044",
      "author": "Rajat Mittal",
      "rating": 5,
      "date": "2 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating blackcurrant and velvet musk notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-midnight-045",
      "author": "Vandana Sethi",
      "rating": 5,
      "date": "3 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-midnight-046",
      "author": "Arjun Deshmukh",
      "rating": 5,
      "date": "4 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Midnight after reading about the notes (blackcurrant, bergamot, and tuberose). It exceeded all my expectations! Highly recommend for anyone looking for sensual allure.",
      "verified": true
    },
    {
      "id": "rev-midnight-047",
      "author": "Shreya Dasgupta",
      "rating": 4,
      "date": "5 days ago",
      "title": "Very high quality formulation and beautiful engraving",
      "comment": "The sillage on Midnight is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of blackcurrant and tuberose is pure art.",
      "verified": true
    },
    {
      "id": "rev-midnight-048",
      "author": "Smriti Pandey",
      "rating": 5,
      "date": "6 days ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of blackcurrant are top tier.",
      "verified": true
    }
  ],
  "mirai": [
    {
      "id": "rev-mirai-001",
      "author": "Vicky Talwar",
      "rating": 5,
      "date": "Yesterday",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Mirai for special evenings and the compliments haven't stopped. The dry down notes of sparkling lemon and Calabrian bergamot linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-mirai-002",
      "author": "Vikramaditya K.",
      "rating": 5,
      "date": "2 days ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with sparkling lemon is so crisp and invigorating, transitioning smoothly into French lavender and black pepper. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-mirai-003",
      "author": "Pranav Vashisht",
      "rating": 5,
      "date": "3 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Mirai has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-mirai-004",
      "author": "Alok Sengupta",
      "rating": 5,
      "date": "4 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating sparkling lemon and earthy patchouli notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-mirai-005",
      "author": "Ritu Agrawal",
      "rating": 5,
      "date": "5 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-mirai-006",
      "author": "Vandana Sethi",
      "rating": 5,
      "date": "6 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Mirai after reading about the notes (sparkling lemon, Calabrian bergamot, and French lavender). It exceeded all my expectations! Highly recommend for anyone looking for sharp executive vibe.",
      "verified": true
    },
    {
      "id": "rev-mirai-007",
      "author": "Rohan Mehta",
      "rating": 5,
      "date": "1 week ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Mirai is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of sparkling lemon and French lavender is pure art.",
      "verified": true
    },
    {
      "id": "rev-mirai-008",
      "author": "Smriti Pandey",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of sparkling lemon are top tier.",
      "verified": true
    },
    {
      "id": "rev-mirai-009",
      "author": "Aishwarya Menon",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of earthy patchouli combined with sparkling lemon create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-mirai-010",
      "author": "Tarun Mathur",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Mirai is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-mirai-011",
      "author": "Varun Chauhan",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The sparkling lemon accord opens up beautifully without any alcohol blast, and settles into deep Calabrian bergamot.",
      "verified": true
    },
    {
      "id": "rev-mirai-012",
      "author": "Deepak Rao",
      "rating": 5,
      "date": "1 month ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-mirai-013",
      "author": "Zoya Merchant",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love crisp morning freshness, do not think twice. The balance of sparkling lemon and black pepper is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-mirai-014",
      "author": "Sunil Goswami",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Mirai gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-mirai-015",
      "author": "Akash Ganguly",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of sparkling lemon and Calabrian bergamot on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-mirai-016",
      "author": "Kritika Soni",
      "rating": 5,
      "date": "2 months ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of sparkling lemon and Calabrian bergamot all day long.",
      "verified": true
    },
    {
      "id": "rev-mirai-017",
      "author": "Kritika Soni",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The sparkling lemon opening is bright and luxurious, leading into French lavender with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-mirai-018",
      "author": "Anjali Bose",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Mirai easily holds its own against top European houses. Beautifully blended with sparkling lemon, black pepper and earthy patchouli.",
      "verified": true
    },
    {
      "id": "rev-mirai-019",
      "author": "Aishwarya Menon",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of sparkling lemon makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-mirai-020",
      "author": "Sonali Hegde",
      "rating": 5,
      "date": "4 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The sparkling lemon note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-mirai-021",
      "author": "Mihir Bhatt",
      "rating": 5,
      "date": "5 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Mirai for special evenings and the compliments haven't stopped. The dry down notes of sparkling lemon and Calabrian bergamot linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-mirai-022",
      "author": "Ananya Roy",
      "rating": 5,
      "date": "Yesterday",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with sparkling lemon is so crisp and invigorating, transitioning smoothly into French lavender and black pepper. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-mirai-023",
      "author": "Pooja Chawla",
      "rating": 5,
      "date": "2 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Mirai has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-mirai-024",
      "author": "Avni Reddy",
      "rating": 5,
      "date": "3 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating sparkling lemon and earthy patchouli notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-mirai-025",
      "author": "Zoya Merchant",
      "rating": 5,
      "date": "4 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-mirai-026",
      "author": "Harsh Vardhan",
      "rating": 5,
      "date": "5 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Mirai after reading about the notes (sparkling lemon, Calabrian bergamot, and French lavender). It exceeded all my expectations! Highly recommend for anyone looking for sharp executive vibe.",
      "verified": true
    },
    {
      "id": "rev-mirai-027",
      "author": "Anjali Bose",
      "rating": 4,
      "date": "6 days ago",
      "title": "Very high quality formulation and beautiful engraving",
      "comment": "The sillage on Mirai is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of sparkling lemon and French lavender is pure art.",
      "verified": true
    },
    {
      "id": "rev-mirai-028",
      "author": "Tanvi Kapoor",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of sparkling lemon are top tier.",
      "verified": true
    },
    {
      "id": "rev-mirai-029",
      "author": "Yashvardhan Kulkarni",
      "rating": 5,
      "date": "1 week ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of earthy patchouli combined with sparkling lemon create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-mirai-030",
      "author": "Bhavna Kaushik",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Mirai is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-mirai-031",
      "author": "Geetika Chopra",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The sparkling lemon accord opens up beautifully without any alcohol blast, and settles into deep Calabrian bergamot.",
      "verified": true
    },
    {
      "id": "rev-mirai-032",
      "author": "Divya Pillai",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-mirai-033",
      "author": "Uday Shenoy",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love crisp morning freshness, do not think twice. The balance of sparkling lemon and black pepper is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-mirai-034",
      "author": "Swati Nambiar",
      "rating": 5,
      "date": "1 month ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Mirai gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-mirai-035",
      "author": "Simran Gill",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of sparkling lemon and Calabrian bergamot on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-mirai-036",
      "author": "Jhanvi Mittal",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of sparkling lemon and Calabrian bergamot all day long.",
      "verified": true
    },
    {
      "id": "rev-mirai-037",
      "author": "Pranav Vashisht",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The sparkling lemon opening is bright and luxurious, leading into French lavender with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-mirai-038",
      "author": "Akash Ganguly",
      "rating": 5,
      "date": "2 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Mirai easily holds its own against top European houses. Beautifully blended with sparkling lemon, black pepper and earthy patchouli.",
      "verified": true
    },
    {
      "id": "rev-mirai-039",
      "author": "Rhea Mukherjee",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of sparkling lemon makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-mirai-040",
      "author": "Pallavi Menon",
      "rating": 5,
      "date": "3 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The sparkling lemon note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-mirai-041",
      "author": "Sanya Goel",
      "rating": 5,
      "date": "4 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Mirai for special evenings and the compliments haven't stopped. The dry down notes of sparkling lemon and Calabrian bergamot linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-mirai-042",
      "author": "Tanvi Kapoor",
      "rating": 5,
      "date": "5 months ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with sparkling lemon is so crisp and invigorating, transitioning smoothly into French lavender and black pepper. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-mirai-043",
      "author": "Shreya Dasgupta",
      "rating": 5,
      "date": "Yesterday",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Mirai has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-mirai-044",
      "author": "Farhan Alvi",
      "rating": 5,
      "date": "2 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating sparkling lemon and earthy patchouli notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-mirai-045",
      "author": "Kabir Sen",
      "rating": 5,
      "date": "3 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-mirai-046",
      "author": "Kavya Patel",
      "rating": 5,
      "date": "4 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Mirai after reading about the notes (sparkling lemon, Calabrian bergamot, and French lavender). It exceeded all my expectations! Highly recommend for anyone looking for sharp executive vibe.",
      "verified": true
    },
    {
      "id": "rev-mirai-047",
      "author": "Shweta Khandelwal",
      "rating": 5,
      "date": "5 days ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Mirai is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of sparkling lemon and French lavender is pure art.",
      "verified": true
    },
    {
      "id": "rev-mirai-048",
      "author": "Rishabh Jain",
      "rating": 5,
      "date": "6 days ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of sparkling lemon are top tier.",
      "verified": true
    },
    {
      "id": "rev-mirai-049",
      "author": "Vicky Talwar",
      "rating": 5,
      "date": "1 week ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of earthy patchouli combined with sparkling lemon create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-mirai-050",
      "author": "Karan Bhasin",
      "rating": 5,
      "date": "1 week ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Mirai is absolute magic.",
      "verified": true
    }
  ],
  "0809": [
    {
      "id": "rev-0809-001",
      "author": "Kabir Sen",
      "rating": 5,
      "date": "Yesterday",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing 0809 for special evenings and the compliments haven't stopped. The dry down notes of Sichuan pepper and French lavender linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-0809-002",
      "author": "Radhika Murthy",
      "rating": 5,
      "date": "2 days ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with Sichuan pepper is so crisp and invigorating, transitioning smoothly into star anise and warm nutmeg. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-0809-003",
      "author": "Kunal Grover",
      "rating": 5,
      "date": "3 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. 0809 has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-0809-004",
      "author": "Natasha Khurana",
      "rating": 5,
      "date": "4 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating Sichuan pepper and deep ambroxan notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-0809-005",
      "author": "Siddharth Verma",
      "rating": 5,
      "date": "5 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-0809-006",
      "author": "Neha Singhania",
      "rating": 5,
      "date": "6 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought 0809 after reading about the notes (Sichuan pepper, French lavender, and star anise). It exceeded all my expectations! Highly recommend for anyone looking for signature alpha aura.",
      "verified": true
    },
    {
      "id": "rev-0809-007",
      "author": "Ritu Agrawal",
      "rating": 5,
      "date": "1 week ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on 0809 is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of Sichuan pepper and star anise is pure art.",
      "verified": true
    },
    {
      "id": "rev-0809-008",
      "author": "Aishwarya Menon",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of Sichuan pepper are top tier.",
      "verified": true
    },
    {
      "id": "rev-0809-009",
      "author": "Meera Iyer",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of deep ambroxan combined with Sichuan pepper create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-0809-010",
      "author": "Harsh Vardhan",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. 0809 is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-0809-011",
      "author": "Yashvardhan Kulkarni",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The Sichuan pepper accord opens up beautifully without any alcohol blast, and settles into deep French lavender.",
      "verified": true
    },
    {
      "id": "rev-0809-012",
      "author": "Aditya Joshi",
      "rating": 5,
      "date": "1 month ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-0809-013",
      "author": "Sunil Goswami",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love beast mode projection, do not think twice. The balance of Sichuan pepper and warm nutmeg is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-0809-014",
      "author": "Geetika Chopra",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing 0809 gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-0809-015",
      "author": "Payal Ahuja",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of Sichuan pepper and French lavender on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-0809-016",
      "author": "Rhea Mukherjee",
      "rating": 5,
      "date": "2 months ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of Sichuan pepper and French lavender all day long.",
      "verified": true
    },
    {
      "id": "rev-0809-017",
      "author": "Ishaan Malhotra",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The Sichuan pepper opening is bright and luxurious, leading into star anise with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-0809-018",
      "author": "Avni Reddy",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and 0809 easily holds its own against top European houses. Beautifully blended with Sichuan pepper, warm nutmeg and deep ambroxan.",
      "verified": true
    },
    {
      "id": "rev-0809-019",
      "author": "Varun Chauhan",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of Sichuan pepper makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-0809-020",
      "author": "Gaurav Trivedi",
      "rating": 5,
      "date": "4 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The Sichuan pepper note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-0809-021",
      "author": "Bhavna Kaushik",
      "rating": 5,
      "date": "5 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing 0809 for special evenings and the compliments haven't stopped. The dry down notes of Sichuan pepper and French lavender linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-0809-022",
      "author": "Vicky Talwar",
      "rating": 5,
      "date": "Yesterday",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with Sichuan pepper is so crisp and invigorating, transitioning smoothly into star anise and warm nutmeg. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-0809-023",
      "author": "Zoya Merchant",
      "rating": 5,
      "date": "2 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. 0809 has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-0809-024",
      "author": "Farhan Alvi",
      "rating": 5,
      "date": "3 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating Sichuan pepper and deep ambroxan notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-0809-025",
      "author": "Pooja Chawla",
      "rating": 4,
      "date": "4 days ago",
      "title": "Great scent & projection, wish I got the 50ml earlier",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-0809-026",
      "author": "Rahul Saxena",
      "rating": 5,
      "date": "5 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought 0809 after reading about the notes (Sichuan pepper, French lavender, and star anise). It exceeded all my expectations! Highly recommend for anyone looking for signature alpha aura.",
      "verified": true
    },
    {
      "id": "rev-0809-027",
      "author": "Sanya Goel",
      "rating": 5,
      "date": "6 days ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on 0809 is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of Sichuan pepper and star anise is pure art.",
      "verified": true
    },
    {
      "id": "rev-0809-028",
      "author": "Aarav Sharma",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of Sichuan pepper are top tier.",
      "verified": true
    },
    {
      "id": "rev-0809-029",
      "author": "Nikhil Bhatia",
      "rating": 5,
      "date": "1 week ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of deep ambroxan combined with Sichuan pepper create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-0809-030",
      "author": "Shweta Khandelwal",
      "rating": 4,
      "date": "2 weeks ago",
      "title": "Outstanding fragrance, strong for the first 8 hours",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. 0809 is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-0809-031",
      "author": "Kabir Sen",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The Sichuan pepper accord opens up beautifully without any alcohol blast, and settles into deep French lavender.",
      "verified": true
    },
    {
      "id": "rev-0809-032",
      "author": "Pallavi Menon",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-0809-033",
      "author": "Ayaan Qureshi",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love beast mode projection, do not think twice. The balance of Sichuan pepper and warm nutmeg is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-0809-034",
      "author": "Tarun Mathur",
      "rating": 5,
      "date": "1 month ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing 0809 gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-0809-035",
      "author": "Sanya Goel",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of Sichuan pepper and French lavender on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-0809-036",
      "author": "Girish Sundaram",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of Sichuan pepper and French lavender all day long.",
      "verified": true
    },
    {
      "id": "rev-0809-037",
      "author": "Aarav Sharma",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The Sichuan pepper opening is bright and luxurious, leading into star anise with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-0809-038",
      "author": "Farhan Alvi",
      "rating": 5,
      "date": "2 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and 0809 easily holds its own against top European houses. Beautifully blended with Sichuan pepper, warm nutmeg and deep ambroxan.",
      "verified": true
    },
    {
      "id": "rev-0809-039",
      "author": "Chirag Singhal",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of Sichuan pepper makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-0809-040",
      "author": "Neha Singhania",
      "rating": 5,
      "date": "3 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The Sichuan pepper note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-0809-041",
      "author": "Mihir Bhatt",
      "rating": 5,
      "date": "4 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing 0809 for special evenings and the compliments haven't stopped. The dry down notes of Sichuan pepper and French lavender linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-0809-042",
      "author": "Devendra Rathore",
      "rating": 5,
      "date": "5 months ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with Sichuan pepper is so crisp and invigorating, transitioning smoothly into star anise and warm nutmeg. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-0809-043",
      "author": "Geetika Chopra",
      "rating": 5,
      "date": "Yesterday",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. 0809 has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-0809-044",
      "author": "Rahul Saxena",
      "rating": 5,
      "date": "2 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating Sichuan pepper and deep ambroxan notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-0809-045",
      "author": "Tarun Mathur",
      "rating": 5,
      "date": "3 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-0809-046",
      "author": "Karan Bhasin",
      "rating": 5,
      "date": "4 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought 0809 after reading about the notes (Sichuan pepper, French lavender, and star anise). It exceeded all my expectations! Highly recommend for anyone looking for signature alpha aura.",
      "verified": true
    },
    {
      "id": "rev-0809-047",
      "author": "Priya Nair",
      "rating": 5,
      "date": "5 days ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on 0809 is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of Sichuan pepper and star anise is pure art.",
      "verified": true
    },
    {
      "id": "rev-0809-048",
      "author": "Shreya Dasgupta",
      "rating": 4,
      "date": "6 days ago",
      "title": "Classy and sophisticated \u2014 great for evening wear",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of Sichuan pepper are top tier.",
      "verified": true
    },
    {
      "id": "rev-0809-049",
      "author": "Kavya Patel",
      "rating": 5,
      "date": "1 week ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of deep ambroxan combined with Sichuan pepper create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-0809-050",
      "author": "Pranav Vashisht",
      "rating": 5,
      "date": "1 week ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. 0809 is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-0809-051",
      "author": "Mihir Bhatt",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The Sichuan pepper accord opens up beautifully without any alcohol blast, and settles into deep French lavender.",
      "verified": true
    },
    {
      "id": "rev-0809-052",
      "author": "Radhika Murthy",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-0809-053",
      "author": "Jhanvi Mittal",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love beast mode projection, do not think twice. The balance of Sichuan pepper and warm nutmeg is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-0809-054",
      "author": "Rajat Mittal",
      "rating": 5,
      "date": "1 month ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing 0809 gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-0809-055",
      "author": "Rohan Mehta",
      "rating": 5,
      "date": "1 month ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of Sichuan pepper and French lavender on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-0809-056",
      "author": "Jhanvi Mittal",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of Sichuan pepper and French lavender all day long.",
      "verified": true
    },
    {
      "id": "rev-0809-057",
      "author": "Simran Gill",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The Sichuan pepper opening is bright and luxurious, leading into star anise with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-0809-058",
      "author": "Sunil Goswami",
      "rating": 5,
      "date": "2 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and 0809 easily holds its own against top European houses. Beautifully blended with Sichuan pepper, warm nutmeg and deep ambroxan.",
      "verified": true
    }
  ],
  "personna": [
    {
      "id": "rev-personna-001",
      "author": "Kunal Grover",
      "rating": 5,
      "date": "Yesterday",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Personna for special evenings and the compliments haven't stopped. The dry down notes of mandarin orange and bergamot linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-personna-002",
      "author": "Rahul Saxena",
      "rating": 5,
      "date": "2 days ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with mandarin orange is so crisp and invigorating, transitioning smoothly into spiced rose petals and cardamom. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-personna-003",
      "author": "Simran Gill",
      "rating": 5,
      "date": "3 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Personna has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-personna-004",
      "author": "Ritu Agrawal",
      "rating": 5,
      "date": "4 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating mandarin orange and patchouli notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-personna-005",
      "author": "Neha Singhania",
      "rating": 4,
      "date": "5 days ago",
      "title": "Great scent & projection, wish I got the 50ml earlier",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-personna-006",
      "author": "Nikhil Bhatia",
      "rating": 5,
      "date": "6 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Personna after reading about the notes (mandarin orange, bergamot, and spiced rose petals). It exceeded all my expectations! Highly recommend for anyone looking for spiced elegance.",
      "verified": true
    },
    {
      "id": "rev-personna-007",
      "author": "Shweta Khandelwal",
      "rating": 5,
      "date": "1 week ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Personna is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of mandarin orange and spiced rose petals is pure art.",
      "verified": true
    },
    {
      "id": "rev-personna-008",
      "author": "Pranav Vashisht",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of mandarin orange are top tier.",
      "verified": true
    },
    {
      "id": "rev-personna-009",
      "author": "Geetika Chopra",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of patchouli combined with mandarin orange create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-personna-010",
      "author": "Yashvardhan Kulkarni",
      "rating": 4,
      "date": "2 weeks ago",
      "title": "Outstanding fragrance, strong for the first 8 hours",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Personna is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-personna-011",
      "author": "Sunil Goswami",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The mandarin orange accord opens up beautifully without any alcohol blast, and settles into deep bergamot.",
      "verified": true
    },
    {
      "id": "rev-personna-012",
      "author": "Kavya Patel",
      "rating": 5,
      "date": "1 month ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-personna-013",
      "author": "Aishwarya Menon",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love unique distinctive personality, do not think twice. The balance of mandarin orange and cardamom is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-personna-014",
      "author": "Vikramaditya K.",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Personna gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-personna-015",
      "author": "Sonali Hegde",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of mandarin orange and bergamot on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-personna-016",
      "author": "Ananya Roy",
      "rating": 5,
      "date": "2 months ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of mandarin orange and bergamot all day long.",
      "verified": true
    },
    {
      "id": "rev-personna-017",
      "author": "Siddharth Verma",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The mandarin orange opening is bright and luxurious, leading into spiced rose petals with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-personna-018",
      "author": "Akash Ganguly",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Personna easily holds its own against top European houses. Beautifully blended with mandarin orange, cardamom and patchouli.",
      "verified": true
    },
    {
      "id": "rev-personna-019",
      "author": "Tarun Mathur",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of mandarin orange makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-personna-020",
      "author": "Jhanvi Mittal",
      "rating": 5,
      "date": "4 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The mandarin orange note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-personna-021",
      "author": "Tanvi Kapoor",
      "rating": 4,
      "date": "5 months ago",
      "title": "Great scent & projection, wish I got the 50ml earlier",
      "comment": "I have been wearing Personna for special evenings and the compliments haven't stopped. The dry down notes of mandarin orange and bergamot linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-personna-022",
      "author": "Pallavi Menon",
      "rating": 5,
      "date": "Yesterday",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with mandarin orange is so crisp and invigorating, transitioning smoothly into spiced rose petals and cardamom. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-personna-023",
      "author": "Girish Sundaram",
      "rating": 5,
      "date": "2 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Personna has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-personna-024",
      "author": "Neha Singhania",
      "rating": 5,
      "date": "3 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating mandarin orange and patchouli notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-personna-025",
      "author": "Aishwarya Menon",
      "rating": 5,
      "date": "4 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-personna-026",
      "author": "Ananya Roy",
      "rating": 5,
      "date": "5 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Personna after reading about the notes (mandarin orange, bergamot, and spiced rose petals). It exceeded all my expectations! Highly recommend for anyone looking for spiced elegance.",
      "verified": true
    },
    {
      "id": "rev-personna-027",
      "author": "Ritu Agrawal",
      "rating": 5,
      "date": "6 days ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Personna is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of mandarin orange and spiced rose petals is pure art.",
      "verified": true
    },
    {
      "id": "rev-personna-028",
      "author": "Varun Chauhan",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of mandarin orange are top tier.",
      "verified": true
    },
    {
      "id": "rev-personna-029",
      "author": "Tushar Banerjee",
      "rating": 5,
      "date": "1 week ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of patchouli combined with mandarin orange create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-personna-030",
      "author": "Kabir Sen",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Personna is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-personna-031",
      "author": "Karan Bhasin",
      "rating": 4,
      "date": "2 weeks ago",
      "title": "Very high quality formulation and beautiful engraving",
      "comment": "The quality of raw ingredients is evident from the first spray. The mandarin orange accord opens up beautifully without any alcohol blast, and settles into deep bergamot.",
      "verified": true
    },
    {
      "id": "rev-personna-032",
      "author": "Nikhil Bhatia",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-personna-033",
      "author": "Divya Pillai",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love unique distinctive personality, do not think twice. The balance of mandarin orange and cardamom is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-personna-034",
      "author": "Geetika Chopra",
      "rating": 5,
      "date": "1 month ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Personna gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-personna-035",
      "author": "Karan Bhasin",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of mandarin orange and bergamot on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-personna-036",
      "author": "Rhea Mukherjee",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of mandarin orange and bergamot all day long.",
      "verified": true
    },
    {
      "id": "rev-personna-037",
      "author": "Siddharth Verma",
      "rating": 4,
      "date": "2 months ago",
      "title": "Great scent & projection, wish I got the 50ml earlier",
      "comment": "Exceptional formulation! The mandarin orange opening is bright and luxurious, leading into spiced rose petals with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-personna-038",
      "author": "Alok Sengupta",
      "rating": 5,
      "date": "2 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Personna easily holds its own against top European houses. Beautifully blended with mandarin orange, cardamom and patchouli.",
      "verified": true
    },
    {
      "id": "rev-personna-039",
      "author": "Farhan Alvi",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of mandarin orange makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-personna-040",
      "author": "Gaurav Trivedi",
      "rating": 5,
      "date": "3 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The mandarin orange note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-personna-041",
      "author": "Mihir Bhatt",
      "rating": 5,
      "date": "4 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Personna for special evenings and the compliments haven't stopped. The dry down notes of mandarin orange and bergamot linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-personna-042",
      "author": "Payal Ahuja",
      "rating": 5,
      "date": "5 months ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with mandarin orange is so crisp and invigorating, transitioning smoothly into spiced rose petals and cardamom. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-personna-043",
      "author": "Manish Bhardwaj",
      "rating": 5,
      "date": "Yesterday",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Personna has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-personna-044",
      "author": "Arjun Deshmukh",
      "rating": 5,
      "date": "2 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating mandarin orange and patchouli notes. The projection is polite yet unforgettable.",
      "verified": true
    }
  ],
  "purple-oud": [
    {
      "id": "rev-purple-oud-001",
      "author": "Nidhi Agarwal",
      "rating": 5,
      "date": "Yesterday",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Purple Oud for special evenings and the compliments haven't stopped. The dry down notes of smoky Cambodian oud and fiery Kashmiri saffron linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-002",
      "author": "Sanya Goel",
      "rating": 5,
      "date": "2 days ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with smoky Cambodian oud is so crisp and invigorating, transitioning smoothly into amethyst velvet rose and amberwood resin. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-003",
      "author": "Neha Singhania",
      "rating": 5,
      "date": "3 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Purple Oud has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-004",
      "author": "Bhavna Kaushik",
      "rating": 5,
      "date": "4 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating smoky Cambodian oud and smoky Cambodian oud notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-005",
      "author": "Uday Shenoy",
      "rating": 5,
      "date": "5 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-purple-oud-006",
      "author": "Nikhil Bhatia",
      "rating": 5,
      "date": "6 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Purple Oud after reading about the notes (smoky Cambodian oud, amethyst velvet rose, and amberwood resin). It exceeded all my expectations! Highly recommend for anyone looking for 16+ hours longevity.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-007",
      "author": "Farhan Alvi",
      "rating": 5,
      "date": "1 week ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Purple Oud is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of smoky Cambodian oud and amberwood resin is pure art.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-008",
      "author": "Siddharth Verma",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of smoky Cambodian oud are top tier.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-009",
      "author": "Meera Iyer",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of fiery Kashmiri saffron combined with amethyst velvet rose create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-010",
      "author": "Karan Bhasin",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Purple Oud is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-011",
      "author": "Rishabh Jain",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The smoky Cambodian oud accord opens up beautifully without any alcohol blast, and settles into deep amberwood resin.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-012",
      "author": "Smriti Pandey",
      "rating": 5,
      "date": "1 month ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-013",
      "author": "Ananya Roy",
      "rating": 4,
      "date": "1 month ago",
      "title": "Great scent & projection, wish I got the 50ml earlier",
      "comment": "If you love royal regal presence, do not think twice. The balance of smoky Cambodian oud and fiery Kashmiri saffron is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-014",
      "author": "Vicky Talwar",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Purple Oud gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-015",
      "author": "Harsh Vardhan",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of amberwood resin and smoky Cambodian oud on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-016",
      "author": "Swati Nambiar",
      "rating": 5,
      "date": "2 months ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of smoky Cambodian oud and smoky Cambodian oud all day long.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-017",
      "author": "Gaurav Trivedi",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The smoky Cambodian oud opening is bright and luxurious, leading into fiery Kashmiri saffron with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-018",
      "author": "Chirag Singhal",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Purple Oud easily holds its own against top European houses. Beautifully blended with smoky Cambodian oud, amethyst velvet rose and amberwood resin.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-019",
      "author": "Alok Sengupta",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of smoky Cambodian oud makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-020",
      "author": "Vandana Sethi",
      "rating": 5,
      "date": "4 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The smoky Cambodian oud note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-021",
      "author": "Samir Bajaj",
      "rating": 5,
      "date": "5 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Purple Oud for special evenings and the compliments haven't stopped. The dry down notes of smoky Cambodian oud and fiery Kashmiri saffron linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-022",
      "author": "Pallavi Menon",
      "rating": 5,
      "date": "Yesterday",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with smoky Cambodian oud is so crisp and invigorating, transitioning smoothly into amethyst velvet rose and amberwood resin. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-023",
      "author": "Ayaan Qureshi",
      "rating": 4,
      "date": "2 days ago",
      "title": "Very high quality formulation and beautiful engraving",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Purple Oud has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-024",
      "author": "Anjali Bose",
      "rating": 5,
      "date": "3 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating smoky Cambodian oud and smoky Cambodian oud notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-025",
      "author": "Kavya Patel",
      "rating": 5,
      "date": "4 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-purple-oud-026",
      "author": "Gaurav Trivedi",
      "rating": 5,
      "date": "5 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Purple Oud after reading about the notes (smoky Cambodian oud, amethyst velvet rose, and amberwood resin). It exceeded all my expectations! Highly recommend for anyone looking for 16+ hours longevity.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-027",
      "author": "Zoya Merchant",
      "rating": 5,
      "date": "6 days ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Purple Oud is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of smoky Cambodian oud and amberwood resin is pure art.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-028",
      "author": "Vicky Talwar",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of smoky Cambodian oud are top tier.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-029",
      "author": "Priya Nair",
      "rating": 5,
      "date": "1 week ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of fiery Kashmiri saffron combined with amethyst velvet rose create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-030",
      "author": "Aarav Sharma",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Purple Oud is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-031",
      "author": "Avni Reddy",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The smoky Cambodian oud accord opens up beautifully without any alcohol blast, and settles into deep amberwood resin.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-032",
      "author": "Kavya Patel",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-033",
      "author": "Nikhil Bhatia",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love royal regal presence, do not think twice. The balance of smoky Cambodian oud and fiery Kashmiri saffron is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-034",
      "author": "Shreya Dasgupta",
      "rating": 5,
      "date": "1 month ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Purple Oud gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-035",
      "author": "Tushar Banerjee",
      "rating": 4,
      "date": "5 weeks ago",
      "title": "Very high quality formulation and beautiful engraving",
      "comment": "The drydown of amberwood resin and smoky Cambodian oud on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-036",
      "author": "Rishabh Jain",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of smoky Cambodian oud and smoky Cambodian oud all day long.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-037",
      "author": "Deepak Rao",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The smoky Cambodian oud opening is bright and luxurious, leading into fiery Kashmiri saffron with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-038",
      "author": "Pallavi Menon",
      "rating": 5,
      "date": "2 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Purple Oud easily holds its own against top European houses. Beautifully blended with smoky Cambodian oud, amethyst velvet rose and amberwood resin.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-039",
      "author": "Sanya Goel",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of smoky Cambodian oud makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-040",
      "author": "Aishwarya Menon",
      "rating": 5,
      "date": "3 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The smoky Cambodian oud note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-041",
      "author": "Divya Pillai",
      "rating": 5,
      "date": "4 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Purple Oud for special evenings and the compliments haven't stopped. The dry down notes of smoky Cambodian oud and fiery Kashmiri saffron linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-042",
      "author": "Aishwarya Menon",
      "rating": 5,
      "date": "5 months ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with smoky Cambodian oud is so crisp and invigorating, transitioning smoothly into amethyst velvet rose and amberwood resin. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-043",
      "author": "Radhika Murthy",
      "rating": 5,
      "date": "Yesterday",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Purple Oud has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-044",
      "author": "Vikramaditya K.",
      "rating": 5,
      "date": "2 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating smoky Cambodian oud and smoky Cambodian oud notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-045",
      "author": "Arjun Deshmukh",
      "rating": 4,
      "date": "3 days ago",
      "title": "Great scent & projection, wish I got the 50ml earlier",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-purple-oud-046",
      "author": "Natasha Khurana",
      "rating": 5,
      "date": "4 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Purple Oud after reading about the notes (smoky Cambodian oud, amethyst velvet rose, and amberwood resin). It exceeded all my expectations! Highly recommend for anyone looking for 16+ hours longevity.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-047",
      "author": "Tarun Mathur",
      "rating": 5,
      "date": "5 days ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Purple Oud is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of smoky Cambodian oud and amberwood resin is pure art.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-048",
      "author": "Zoya Merchant",
      "rating": 5,
      "date": "6 days ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of smoky Cambodian oud are top tier.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-049",
      "author": "Ritu Agrawal",
      "rating": 5,
      "date": "1 week ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of fiery Kashmiri saffron combined with amethyst velvet rose create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-050",
      "author": "Kritika Soni",
      "rating": 5,
      "date": "1 week ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Purple Oud is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-051",
      "author": "Tanvi Kapoor",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The smoky Cambodian oud accord opens up beautifully without any alcohol blast, and settles into deep amberwood resin.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-052",
      "author": "Payal Ahuja",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-053",
      "author": "Yashvardhan Kulkarni",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love royal regal presence, do not think twice. The balance of smoky Cambodian oud and fiery Kashmiri saffron is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-054",
      "author": "Rohan Mehta",
      "rating": 5,
      "date": "1 month ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Purple Oud gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-055",
      "author": "Priya Nair",
      "rating": 4,
      "date": "1 month ago",
      "title": "Very high quality formulation and beautiful engraving",
      "comment": "The drydown of amberwood resin and smoky Cambodian oud on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-056",
      "author": "Akash Ganguly",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of smoky Cambodian oud and smoky Cambodian oud all day long.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-057",
      "author": "Ayaan Qureshi",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The smoky Cambodian oud opening is bright and luxurious, leading into fiery Kashmiri saffron with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-058",
      "author": "Radhika Murthy",
      "rating": 5,
      "date": "2 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Purple Oud easily holds its own against top European houses. Beautifully blended with smoky Cambodian oud, amethyst velvet rose and amberwood resin.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-059",
      "author": "Harsh Vardhan",
      "rating": 5,
      "date": "2 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of smoky Cambodian oud makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-purple-oud-060",
      "author": "Girish Sundaram",
      "rating": 4,
      "date": "3 months ago",
      "title": "Classy and sophisticated \u2014 great for evening wear",
      "comment": "Such a memorable fragrance profile. The smoky Cambodian oud note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    }
  ],
  "rich": [
    {
      "id": "rev-rich-001",
      "author": "Geetika Chopra",
      "rating": 5,
      "date": "Yesterday",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Rich for special evenings and the compliments haven't stopped. The dry down notes of opulent bergamot and mandarin zest linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-rich-002",
      "author": "Ayaan Qureshi",
      "rating": 5,
      "date": "2 days ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with opulent bergamot is so crisp and invigorating, transitioning smoothly into spiced rose heart and velvet amber. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-rich-003",
      "author": "Priya Nair",
      "rating": 5,
      "date": "3 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Rich has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-rich-004",
      "author": "Simran Gill",
      "rating": 5,
      "date": "4 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating opulent bergamot and rich musk notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-rich-005",
      "author": "Pranav Vashisht",
      "rating": 5,
      "date": "5 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-rich-006",
      "author": "Nikhil Bhatia",
      "rating": 5,
      "date": "6 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Rich after reading about the notes (opulent bergamot, mandarin zest, and spiced rose heart). It exceeded all my expectations! Highly recommend for anyone looking for opulent luxury trail.",
      "verified": true
    },
    {
      "id": "rev-rich-007",
      "author": "Sanya Goel",
      "rating": 5,
      "date": "1 week ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Rich is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of opulent bergamot and spiced rose heart is pure art.",
      "verified": true
    },
    {
      "id": "rev-rich-008",
      "author": "Rohan Mehta",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of opulent bergamot are top tier.",
      "verified": true
    },
    {
      "id": "rev-rich-009",
      "author": "Aditya Joshi",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of rich musk combined with opulent bergamot create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-rich-010",
      "author": "Nidhi Agarwal",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Rich is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-rich-011",
      "author": "Aarav Sharma",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The opulent bergamot accord opens up beautifully without any alcohol blast, and settles into deep mandarin zest.",
      "verified": true
    },
    {
      "id": "rev-rich-012",
      "author": "Tushar Banerjee",
      "rating": 5,
      "date": "1 month ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-rich-013",
      "author": "Radhika Murthy",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love wealth in a bottle, do not think twice. The balance of opulent bergamot and velvet amber is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-rich-014",
      "author": "Sanya Goel",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Rich gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-rich-015",
      "author": "Kavya Patel",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of opulent bergamot and mandarin zest on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-rich-016",
      "author": "Aishwarya Menon",
      "rating": 5,
      "date": "2 months ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of opulent bergamot and mandarin zest all day long.",
      "verified": true
    },
    {
      "id": "rev-rich-017",
      "author": "Natasha Khurana",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The opulent bergamot opening is bright and luxurious, leading into spiced rose heart with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-rich-018",
      "author": "Rohan Mehta",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Rich easily holds its own against top European houses. Beautifully blended with opulent bergamot, velvet amber and rich musk.",
      "verified": true
    },
    {
      "id": "rev-rich-019",
      "author": "Sonali Hegde",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of opulent bergamot makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-rich-020",
      "author": "Samir Bajaj",
      "rating": 5,
      "date": "4 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The opulent bergamot note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-rich-021",
      "author": "Avni Reddy",
      "rating": 5,
      "date": "5 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Rich for special evenings and the compliments haven't stopped. The dry down notes of opulent bergamot and mandarin zest linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-rich-022",
      "author": "Girish Sundaram",
      "rating": 5,
      "date": "Yesterday",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with opulent bergamot is so crisp and invigorating, transitioning smoothly into spiced rose heart and velvet amber. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-rich-023",
      "author": "Gaurav Trivedi",
      "rating": 5,
      "date": "2 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Rich has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-rich-024",
      "author": "Sunil Goswami",
      "rating": 5,
      "date": "3 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating opulent bergamot and rich musk notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-rich-025",
      "author": "Radhika Murthy",
      "rating": 4,
      "date": "4 days ago",
      "title": "Great scent & projection, wish I got the 50ml earlier",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-rich-026",
      "author": "Manish Bhardwaj",
      "rating": 5,
      "date": "5 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Rich after reading about the notes (opulent bergamot, mandarin zest, and spiced rose heart). It exceeded all my expectations! Highly recommend for anyone looking for opulent luxury trail.",
      "verified": true
    },
    {
      "id": "rev-rich-027",
      "author": "Payal Ahuja",
      "rating": 5,
      "date": "6 days ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Rich is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of opulent bergamot and spiced rose heart is pure art.",
      "verified": true
    },
    {
      "id": "rev-rich-028",
      "author": "Pallavi Menon",
      "rating": 4,
      "date": "1 week ago",
      "title": "Classy and sophisticated \u2014 great for evening wear",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of opulent bergamot are top tier.",
      "verified": true
    },
    {
      "id": "rev-rich-029",
      "author": "Rajat Mittal",
      "rating": 5,
      "date": "1 week ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of rich musk combined with opulent bergamot create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-rich-030",
      "author": "Anjali Bose",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Rich is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-rich-031",
      "author": "Rhea Mukherjee",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The opulent bergamot accord opens up beautifully without any alcohol blast, and settles into deep mandarin zest.",
      "verified": true
    },
    {
      "id": "rev-rich-032",
      "author": "Aditya Joshi",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-rich-033",
      "author": "Pooja Chawla",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love wealth in a bottle, do not think twice. The balance of opulent bergamot and velvet amber is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-rich-034",
      "author": "Varun Chauhan",
      "rating": 5,
      "date": "1 month ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Rich gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-rich-035",
      "author": "Jhanvi Mittal",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of opulent bergamot and mandarin zest on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-rich-036",
      "author": "Rhea Mukherjee",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of opulent bergamot and mandarin zest all day long.",
      "verified": true
    },
    {
      "id": "rev-rich-037",
      "author": "Ananya Roy",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The opulent bergamot opening is bright and luxurious, leading into spiced rose heart with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-rich-038",
      "author": "Tarun Mathur",
      "rating": 5,
      "date": "2 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Rich easily holds its own against top European houses. Beautifully blended with opulent bergamot, velvet amber and rich musk.",
      "verified": true
    },
    {
      "id": "rev-rich-039",
      "author": "Divya Pillai",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of opulent bergamot makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-rich-040",
      "author": "Karan Bhasin",
      "rating": 5,
      "date": "3 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The opulent bergamot note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-rich-041",
      "author": "Rajat Mittal",
      "rating": 5,
      "date": "4 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Rich for special evenings and the compliments haven't stopped. The dry down notes of opulent bergamot and mandarin zest linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-rich-042",
      "author": "Pooja Chawla",
      "rating": 5,
      "date": "5 months ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with opulent bergamot is so crisp and invigorating, transitioning smoothly into spiced rose heart and velvet amber. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-rich-043",
      "author": "Swati Nambiar",
      "rating": 5,
      "date": "Yesterday",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Rich has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-rich-044",
      "author": "Ishaan Malhotra",
      "rating": 5,
      "date": "2 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating opulent bergamot and rich musk notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-rich-045",
      "author": "Manish Bhardwaj",
      "rating": 5,
      "date": "3 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-rich-046",
      "author": "Kritika Soni",
      "rating": 5,
      "date": "4 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Rich after reading about the notes (opulent bergamot, mandarin zest, and spiced rose heart). It exceeded all my expectations! Highly recommend for anyone looking for opulent luxury trail.",
      "verified": true
    },
    {
      "id": "rev-rich-047",
      "author": "Zoya Merchant",
      "rating": 5,
      "date": "5 days ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Rich is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of opulent bergamot and spiced rose heart is pure art.",
      "verified": true
    },
    {
      "id": "rev-rich-048",
      "author": "Siddharth Verma",
      "rating": 5,
      "date": "6 days ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of opulent bergamot are top tier.",
      "verified": true
    },
    {
      "id": "rev-rich-049",
      "author": "Akash Ganguly",
      "rating": 5,
      "date": "1 week ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of rich musk combined with opulent bergamot create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-rich-050",
      "author": "Mihir Bhatt",
      "rating": 5,
      "date": "1 week ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Rich is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-rich-051",
      "author": "Devendra Rathore",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The opulent bergamot accord opens up beautifully without any alcohol blast, and settles into deep mandarin zest.",
      "verified": true
    }
  ],
  "seductive": [
    {
      "id": "rev-seductive-001",
      "author": "Chirag Singhal",
      "rating": 5,
      "date": "Yesterday",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Seductive for special evenings and the compliments haven't stopped. The dry down notes of citric limon and fresh lavender linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-seductive-002",
      "author": "Payal Ahuja",
      "rating": 5,
      "date": "2 days ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with citric limon is so crisp and invigorating, transitioning smoothly into spicy floral accord and patchouli. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-seductive-003",
      "author": "Kabir Sen",
      "rating": 5,
      "date": "3 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Seductive has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-seductive-004",
      "author": "Tushar Banerjee",
      "rating": 5,
      "date": "4 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating citric limon and velvet golden amber notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-seductive-005",
      "author": "Vikramaditya K.",
      "rating": 5,
      "date": "5 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-seductive-006",
      "author": "Rohan Mehta",
      "rating": 5,
      "date": "6 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Seductive after reading about the notes (citric limon, fresh lavender, and spicy floral accord). It exceeded all my expectations! Highly recommend for anyone looking for insane compliment getter.",
      "verified": true
    },
    {
      "id": "rev-seductive-007",
      "author": "Divya Pillai",
      "rating": 5,
      "date": "1 week ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Seductive is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of citric limon and spicy floral accord is pure art.",
      "verified": true
    },
    {
      "id": "rev-seductive-008",
      "author": "Tushar Banerjee",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of citric limon are top tier.",
      "verified": true
    },
    {
      "id": "rev-seductive-009",
      "author": "Samir Bajaj",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of velvet golden amber combined with citric limon create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-seductive-010",
      "author": "Mihir Bhatt",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Seductive is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-seductive-011",
      "author": "Girish Sundaram",
      "rating": 4,
      "date": "3 weeks ago",
      "title": "Very high quality formulation and beautiful engraving",
      "comment": "The quality of raw ingredients is evident from the first spray. The citric limon accord opens up beautifully without any alcohol blast, and settles into deep fresh lavender.",
      "verified": true
    },
    {
      "id": "rev-seductive-012",
      "author": "Gaurav Trivedi",
      "rating": 5,
      "date": "1 month ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-seductive-013",
      "author": "Nidhi Agarwal",
      "rating": 4,
      "date": "1 month ago",
      "title": "Great scent & projection, wish I got the 50ml earlier",
      "comment": "If you love number one crowd pleaser, do not think twice. The balance of citric limon and patchouli is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-seductive-014",
      "author": "Devendra Rathore",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Seductive gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-seductive-015",
      "author": "Ananya Roy",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of citric limon and fresh lavender on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-seductive-016",
      "author": "Rhea Mukherjee",
      "rating": 5,
      "date": "2 months ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of citric limon and fresh lavender all day long.",
      "verified": true
    },
    {
      "id": "rev-seductive-017",
      "author": "Arjun Deshmukh",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The citric limon opening is bright and luxurious, leading into spicy floral accord with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-seductive-018",
      "author": "Samir Bajaj",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Seductive easily holds its own against top European houses. Beautifully blended with citric limon, patchouli and velvet golden amber.",
      "verified": true
    },
    {
      "id": "rev-seductive-019",
      "author": "Nikhil Bhatia",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of citric limon makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-seductive-020",
      "author": "Avni Reddy",
      "rating": 5,
      "date": "4 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The citric limon note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-seductive-021",
      "author": "Simran Gill",
      "rating": 5,
      "date": "5 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Seductive for special evenings and the compliments haven't stopped. The dry down notes of citric limon and fresh lavender linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-seductive-022",
      "author": "Kritika Soni",
      "rating": 4,
      "date": "Yesterday",
      "title": "Outstanding fragrance, strong for the first 8 hours",
      "comment": "The opening with citric limon is so crisp and invigorating, transitioning smoothly into spicy floral accord and patchouli. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-seductive-023",
      "author": "Aishwarya Menon",
      "rating": 5,
      "date": "2 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Seductive has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-seductive-024",
      "author": "Priya Nair",
      "rating": 5,
      "date": "3 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating citric limon and velvet golden amber notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-seductive-025",
      "author": "Smriti Pandey",
      "rating": 5,
      "date": "4 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-seductive-026",
      "author": "Nidhi Agarwal",
      "rating": 4,
      "date": "5 days ago",
      "title": "Outstanding fragrance, strong for the first 8 hours",
      "comment": "Blind bought Seductive after reading about the notes (citric limon, fresh lavender, and spicy floral accord). It exceeded all my expectations! Highly recommend for anyone looking for insane compliment getter.",
      "verified": true
    },
    {
      "id": "rev-seductive-027",
      "author": "Arjun Deshmukh",
      "rating": 5,
      "date": "6 days ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Seductive is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of citric limon and spicy floral accord is pure art.",
      "verified": true
    },
    {
      "id": "rev-seductive-028",
      "author": "Tarun Mathur",
      "rating": 4,
      "date": "1 week ago",
      "title": "Classy and sophisticated \u2014 great for evening wear",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of citric limon are top tier.",
      "verified": true
    },
    {
      "id": "rev-seductive-029",
      "author": "Rhea Mukherjee",
      "rating": 5,
      "date": "1 week ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of velvet golden amber combined with citric limon create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-seductive-030",
      "author": "Farhan Alvi",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Seductive is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-seductive-031",
      "author": "Sunil Goswami",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The citric limon accord opens up beautifully without any alcohol blast, and settles into deep fresh lavender.",
      "verified": true
    },
    {
      "id": "rev-seductive-032",
      "author": "Divya Pillai",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-seductive-033",
      "author": "Karan Bhasin",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love number one crowd pleaser, do not think twice. The balance of citric limon and patchouli is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-seductive-034",
      "author": "Vicky Talwar",
      "rating": 5,
      "date": "1 month ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Seductive gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-seductive-035",
      "author": "Varun Chauhan",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of citric limon and fresh lavender on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-seductive-036",
      "author": "Natasha Khurana",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of citric limon and fresh lavender all day long.",
      "verified": true
    },
    {
      "id": "rev-seductive-037",
      "author": "Uday Shenoy",
      "rating": 4,
      "date": "2 months ago",
      "title": "Great scent & projection, wish I got the 50ml earlier",
      "comment": "Exceptional formulation! The citric limon opening is bright and luxurious, leading into spicy floral accord with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-seductive-038",
      "author": "Shweta Khandelwal",
      "rating": 5,
      "date": "2 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Seductive easily holds its own against top European houses. Beautifully blended with citric limon, patchouli and velvet golden amber.",
      "verified": true
    },
    {
      "id": "rev-seductive-039",
      "author": "Rajat Mittal",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of citric limon makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-seductive-040",
      "author": "Geetika Chopra",
      "rating": 5,
      "date": "3 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The citric limon note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-seductive-041",
      "author": "Chirag Singhal",
      "rating": 5,
      "date": "4 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Seductive for special evenings and the compliments haven't stopped. The dry down notes of citric limon and fresh lavender linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-seductive-042",
      "author": "Aishwarya Menon",
      "rating": 5,
      "date": "5 months ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with citric limon is so crisp and invigorating, transitioning smoothly into spicy floral accord and patchouli. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-seductive-043",
      "author": "Ritu Agrawal",
      "rating": 5,
      "date": "Yesterday",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Seductive has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-seductive-044",
      "author": "Sunil Goswami",
      "rating": 5,
      "date": "2 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating citric limon and velvet golden amber notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-seductive-045",
      "author": "Swati Nambiar",
      "rating": 5,
      "date": "3 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-seductive-046",
      "author": "Pooja Chawla",
      "rating": 5,
      "date": "4 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Seductive after reading about the notes (citric limon, fresh lavender, and spicy floral accord). It exceeded all my expectations! Highly recommend for anyone looking for insane compliment getter.",
      "verified": true
    },
    {
      "id": "rev-seductive-047",
      "author": "Bhavna Kaushik",
      "rating": 4,
      "date": "5 days ago",
      "title": "Very high quality formulation and beautiful engraving",
      "comment": "The sillage on Seductive is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of citric limon and spicy floral accord is pure art.",
      "verified": true
    },
    {
      "id": "rev-seductive-048",
      "author": "Avni Reddy",
      "rating": 5,
      "date": "6 days ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of citric limon are top tier.",
      "verified": true
    },
    {
      "id": "rev-seductive-049",
      "author": "Kavya Patel",
      "rating": 5,
      "date": "1 week ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of velvet golden amber combined with citric limon create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-seductive-050",
      "author": "Sonali Hegde",
      "rating": 5,
      "date": "1 week ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Seductive is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-seductive-051",
      "author": "Rahul Saxena",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The citric limon accord opens up beautifully without any alcohol blast, and settles into deep fresh lavender.",
      "verified": true
    },
    {
      "id": "rev-seductive-052",
      "author": "Tanvi Kapoor",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-seductive-053",
      "author": "Anjali Bose",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love number one crowd pleaser, do not think twice. The balance of citric limon and patchouli is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-seductive-054",
      "author": "Shreya Dasgupta",
      "rating": 5,
      "date": "1 month ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Seductive gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-seductive-055",
      "author": "Smriti Pandey",
      "rating": 5,
      "date": "1 month ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of citric limon and fresh lavender on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-seductive-056",
      "author": "Jhanvi Mittal",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of citric limon and fresh lavender all day long.",
      "verified": true
    },
    {
      "id": "rev-seductive-057",
      "author": "Alok Sengupta",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The citric limon opening is bright and luxurious, leading into spicy floral accord with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-seductive-058",
      "author": "Aarav Sharma",
      "rating": 4,
      "date": "2 months ago",
      "title": "Outstanding fragrance, strong for the first 8 hours",
      "comment": "I collect niche perfumes and Seductive easily holds its own against top European houses. Beautifully blended with citric limon, patchouli and velvet golden amber.",
      "verified": true
    },
    {
      "id": "rev-seductive-059",
      "author": "Radhika Murthy",
      "rating": 5,
      "date": "2 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of citric limon makes this a 10/10 purchase.",
      "verified": true
    }
  ],
  "white-oud": [
    {
      "id": "rev-white-oud-001",
      "author": "Varun Chauhan",
      "rating": 5,
      "date": "Yesterday",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing White Oud for special evenings and the compliments haven't stopped. The dry down notes of luminous white oud and pink pepper sparkle linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-white-oud-002",
      "author": "Payal Ahuja",
      "rating": 5,
      "date": "2 days ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with luminous white oud is so crisp and invigorating, transitioning smoothly into crisp vetiver and French lavender. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-white-oud-003",
      "author": "Harsh Vardhan",
      "rating": 5,
      "date": "3 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. White Oud has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-white-oud-004",
      "author": "Kavya Patel",
      "rating": 5,
      "date": "4 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating luminous white oud and warm labdanum notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-white-oud-005",
      "author": "Ishaan Malhotra",
      "rating": 5,
      "date": "5 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-white-oud-006",
      "author": "Neha Singhania",
      "rating": 5,
      "date": "6 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought White Oud after reading about the notes (luminous white oud, pink pepper sparkle, and crisp vetiver). It exceeded all my expectations! Highly recommend for anyone looking for modern chic luxury.",
      "verified": true
    },
    {
      "id": "rev-white-oud-007",
      "author": "Swati Nambiar",
      "rating": 4,
      "date": "1 week ago",
      "title": "Very high quality formulation and beautiful engraving",
      "comment": "The sillage on White Oud is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of luminous white oud and crisp vetiver is pure art.",
      "verified": true
    },
    {
      "id": "rev-white-oud-008",
      "author": "Anjali Bose",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of luminous white oud are top tier.",
      "verified": true
    },
    {
      "id": "rev-white-oud-009",
      "author": "Chirag Singhal",
      "rating": 4,
      "date": "2 weeks ago",
      "title": "Great scent & projection, wish I got the 50ml earlier",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of warm labdanum combined with luminous white oud create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-white-oud-010",
      "author": "Natasha Khurana",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. White Oud is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-white-oud-011",
      "author": "Vandana Sethi",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The luminous white oud accord opens up beautifully without any alcohol blast, and settles into deep pink pepper sparkle.",
      "verified": true
    },
    {
      "id": "rev-white-oud-012",
      "author": "Payal Ahuja",
      "rating": 5,
      "date": "1 month ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-white-oud-013",
      "author": "Shweta Khandelwal",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love clean airy oud, do not think twice. The balance of luminous white oud and French lavender is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-white-oud-014",
      "author": "Pooja Chawla",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing White Oud gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-white-oud-015",
      "author": "Ritu Agrawal",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of luminous white oud and pink pepper sparkle on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-white-oud-016",
      "author": "Priya Nair",
      "rating": 5,
      "date": "2 months ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of luminous white oud and pink pepper sparkle all day long.",
      "verified": true
    },
    {
      "id": "rev-white-oud-017",
      "author": "Tushar Banerjee",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The luminous white oud opening is bright and luxurious, leading into crisp vetiver with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-white-oud-018",
      "author": "Siddharth Verma",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and White Oud easily holds its own against top European houses. Beautifully blended with luminous white oud, French lavender and warm labdanum.",
      "verified": true
    },
    {
      "id": "rev-white-oud-019",
      "author": "Manish Bhardwaj",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of luminous white oud makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-white-oud-020",
      "author": "Sunil Goswami",
      "rating": 5,
      "date": "4 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The luminous white oud note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-white-oud-021",
      "author": "Gaurav Trivedi",
      "rating": 5,
      "date": "5 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing White Oud for special evenings and the compliments haven't stopped. The dry down notes of luminous white oud and pink pepper sparkle linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-white-oud-022",
      "author": "Manish Bhardwaj",
      "rating": 5,
      "date": "Yesterday",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with luminous white oud is so crisp and invigorating, transitioning smoothly into crisp vetiver and French lavender. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-white-oud-023",
      "author": "Sanya Goel",
      "rating": 5,
      "date": "2 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. White Oud has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-white-oud-024",
      "author": "Kavya Patel",
      "rating": 5,
      "date": "3 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating luminous white oud and warm labdanum notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-white-oud-025",
      "author": "Meera Iyer",
      "rating": 5,
      "date": "4 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-white-oud-026",
      "author": "Rishabh Jain",
      "rating": 5,
      "date": "5 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought White Oud after reading about the notes (luminous white oud, pink pepper sparkle, and crisp vetiver). It exceeded all my expectations! Highly recommend for anyone looking for modern chic luxury.",
      "verified": true
    },
    {
      "id": "rev-white-oud-027",
      "author": "Kabir Sen",
      "rating": 5,
      "date": "6 days ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on White Oud is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of luminous white oud and crisp vetiver is pure art.",
      "verified": true
    },
    {
      "id": "rev-white-oud-028",
      "author": "Jhanvi Mittal",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of luminous white oud are top tier.",
      "verified": true
    },
    {
      "id": "rev-white-oud-029",
      "author": "Nikhil Bhatia",
      "rating": 5,
      "date": "1 week ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of warm labdanum combined with luminous white oud create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-white-oud-030",
      "author": "Vicky Talwar",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. White Oud is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-white-oud-031",
      "author": "Tanvi Kapoor",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The luminous white oud accord opens up beautifully without any alcohol blast, and settles into deep pink pepper sparkle.",
      "verified": true
    },
    {
      "id": "rev-white-oud-032",
      "author": "Tushar Banerjee",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-white-oud-033",
      "author": "Sonali Hegde",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love clean airy oud, do not think twice. The balance of luminous white oud and French lavender is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-white-oud-034",
      "author": "Farhan Alvi",
      "rating": 5,
      "date": "1 month ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing White Oud gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-white-oud-035",
      "author": "Devendra Rathore",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of luminous white oud and pink pepper sparkle on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-white-oud-036",
      "author": "Yashvardhan Kulkarni",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of luminous white oud and pink pepper sparkle all day long.",
      "verified": true
    },
    {
      "id": "rev-white-oud-037",
      "author": "Sunil Goswami",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The luminous white oud opening is bright and luxurious, leading into crisp vetiver with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-white-oud-038",
      "author": "Nikhil Bhatia",
      "rating": 5,
      "date": "2 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and White Oud easily holds its own against top European houses. Beautifully blended with luminous white oud, French lavender and warm labdanum.",
      "verified": true
    },
    {
      "id": "rev-white-oud-039",
      "author": "Karan Bhasin",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of luminous white oud makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-white-oud-040",
      "author": "Priya Nair",
      "rating": 5,
      "date": "3 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The luminous white oud note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-white-oud-041",
      "author": "Yashvardhan Kulkarni",
      "rating": 5,
      "date": "4 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing White Oud for special evenings and the compliments haven't stopped. The dry down notes of luminous white oud and pink pepper sparkle linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-white-oud-042",
      "author": "Samir Bajaj",
      "rating": 4,
      "date": "5 months ago",
      "title": "Outstanding fragrance, strong for the first 8 hours",
      "comment": "The opening with luminous white oud is so crisp and invigorating, transitioning smoothly into crisp vetiver and French lavender. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-white-oud-043",
      "author": "Simran Gill",
      "rating": 5,
      "date": "Yesterday",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. White Oud has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-white-oud-044",
      "author": "Ananya Roy",
      "rating": 5,
      "date": "2 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating luminous white oud and warm labdanum notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-white-oud-045",
      "author": "Simran Gill",
      "rating": 5,
      "date": "3 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-white-oud-046",
      "author": "Aditya Joshi",
      "rating": 5,
      "date": "4 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought White Oud after reading about the notes (luminous white oud, pink pepper sparkle, and crisp vetiver). It exceeded all my expectations! Highly recommend for anyone looking for modern chic luxury.",
      "verified": true
    },
    {
      "id": "rev-white-oud-047",
      "author": "Mihir Bhatt",
      "rating": 5,
      "date": "5 days ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on White Oud is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of luminous white oud and crisp vetiver is pure art.",
      "verified": true
    },
    {
      "id": "rev-white-oud-048",
      "author": "Akash Ganguly",
      "rating": 5,
      "date": "6 days ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of luminous white oud are top tier.",
      "verified": true
    },
    {
      "id": "rev-white-oud-049",
      "author": "Aditya Joshi",
      "rating": 5,
      "date": "1 week ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of warm labdanum combined with luminous white oud create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-white-oud-050",
      "author": "Deepak Rao",
      "rating": 5,
      "date": "1 week ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. White Oud is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-white-oud-051",
      "author": "Ritu Agrawal",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The luminous white oud accord opens up beautifully without any alcohol blast, and settles into deep pink pepper sparkle.",
      "verified": true
    },
    {
      "id": "rev-white-oud-052",
      "author": "Ayaan Qureshi",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-white-oud-053",
      "author": "Tarun Mathur",
      "rating": 4,
      "date": "3 weeks ago",
      "title": "Great scent & projection, wish I got the 50ml earlier",
      "comment": "If you love clean airy oud, do not think twice. The balance of luminous white oud and French lavender is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-white-oud-054",
      "author": "Sonali Hegde",
      "rating": 5,
      "date": "1 month ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing White Oud gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-white-oud-055",
      "author": "Divya Pillai",
      "rating": 4,
      "date": "1 month ago",
      "title": "Very high quality formulation and beautiful engraving",
      "comment": "The drydown of luminous white oud and pink pepper sparkle on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    }
  ],
  "zephyrine": [
    {
      "id": "rev-zephyrine-001",
      "author": "Anjali Bose",
      "rating": 4,
      "date": "Yesterday",
      "title": "Great scent & projection, wish I got the 50ml earlier",
      "comment": "I have been wearing Zephyrine for special evenings and the compliments haven't stopped. The dry down notes of airy citrus breeze and lemon zest linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-002",
      "author": "Alok Sengupta",
      "rating": 5,
      "date": "2 days ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with airy citrus breeze is so crisp and invigorating, transitioning smoothly into delicate jasmine and aromatic rosemary. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-003",
      "author": "Gaurav Trivedi",
      "rating": 5,
      "date": "3 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Zephyrine has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-004",
      "author": "Uday Shenoy",
      "rating": 5,
      "date": "4 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating airy citrus breeze and smooth sandalwood notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-005",
      "author": "Ananya Roy",
      "rating": 5,
      "date": "5 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-zephyrine-006",
      "author": "Pallavi Menon",
      "rating": 5,
      "date": "6 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Zephyrine after reading about the notes (airy citrus breeze, lemon zest, and delicate jasmine). It exceeded all my expectations! Highly recommend for anyone looking for gentle coastal elegance.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-007",
      "author": "Vikramaditya K.",
      "rating": 4,
      "date": "1 week ago",
      "title": "Very high quality formulation and beautiful engraving",
      "comment": "The sillage on Zephyrine is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of airy citrus breeze and delicate jasmine is pure art.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-008",
      "author": "Devendra Rathore",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of airy citrus breeze are top tier.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-009",
      "author": "Sunil Goswami",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of smooth sandalwood combined with airy citrus breeze create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-010",
      "author": "Payal Ahuja",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Zephyrine is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-011",
      "author": "Simran Gill",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The airy citrus breeze accord opens up beautifully without any alcohol blast, and settles into deep lemon zest.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-012",
      "author": "Sonali Hegde",
      "rating": 5,
      "date": "1 month ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-013",
      "author": "Shweta Khandelwal",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love refreshing summer breeze, do not think twice. The balance of airy citrus breeze and aromatic rosemary is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-014",
      "author": "Aishwarya Menon",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Zephyrine gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-015",
      "author": "Tanvi Kapoor",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of airy citrus breeze and lemon zest on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-016",
      "author": "Rishabh Jain",
      "rating": 4,
      "date": "2 months ago",
      "title": "Classy and sophisticated \u2014 great for evening wear",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of airy citrus breeze and lemon zest all day long.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-017",
      "author": "Kritika Soni",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The airy citrus breeze opening is bright and luxurious, leading into delicate jasmine with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-018",
      "author": "Devendra Rathore",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Zephyrine easily holds its own against top European houses. Beautifully blended with airy citrus breeze, aromatic rosemary and smooth sandalwood.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-019",
      "author": "Mihir Bhatt",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of airy citrus breeze makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-020",
      "author": "Kabir Sen",
      "rating": 5,
      "date": "4 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The airy citrus breeze note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-021",
      "author": "Geetika Chopra",
      "rating": 5,
      "date": "5 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Zephyrine for special evenings and the compliments haven't stopped. The dry down notes of airy citrus breeze and lemon zest linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-022",
      "author": "Sonali Hegde",
      "rating": 5,
      "date": "Yesterday",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with airy citrus breeze is so crisp and invigorating, transitioning smoothly into delicate jasmine and aromatic rosemary. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-023",
      "author": "Aishwarya Menon",
      "rating": 4,
      "date": "2 days ago",
      "title": "Very high quality formulation and beautiful engraving",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Zephyrine has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-024",
      "author": "Chirag Singhal",
      "rating": 5,
      "date": "3 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating airy citrus breeze and smooth sandalwood notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-025",
      "author": "Kabir Sen",
      "rating": 5,
      "date": "4 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-zephyrine-026",
      "author": "Neha Singhania",
      "rating": 5,
      "date": "5 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Zephyrine after reading about the notes (airy citrus breeze, lemon zest, and delicate jasmine). It exceeded all my expectations! Highly recommend for anyone looking for gentle coastal elegance.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-027",
      "author": "Swati Nambiar",
      "rating": 5,
      "date": "6 days ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Zephyrine is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of airy citrus breeze and delicate jasmine is pure art.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-028",
      "author": "Meera Iyer",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of airy citrus breeze are top tier.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-029",
      "author": "Tarun Mathur",
      "rating": 4,
      "date": "1 week ago",
      "title": "Great scent & projection, wish I got the 50ml earlier",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of smooth sandalwood combined with airy citrus breeze create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-030",
      "author": "Divya Pillai",
      "rating": 4,
      "date": "2 weeks ago",
      "title": "Outstanding fragrance, strong for the first 8 hours",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Zephyrine is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-031",
      "author": "Tanvi Kapoor",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The airy citrus breeze accord opens up beautifully without any alcohol blast, and settles into deep lemon zest.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-032",
      "author": "Rishabh Jain",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-033",
      "author": "Farhan Alvi",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love refreshing summer breeze, do not think twice. The balance of airy citrus breeze and aromatic rosemary is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-034",
      "author": "Gaurav Trivedi",
      "rating": 5,
      "date": "1 month ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Zephyrine gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-035",
      "author": "Deepak Rao",
      "rating": 4,
      "date": "5 weeks ago",
      "title": "Very high quality formulation and beautiful engraving",
      "comment": "The drydown of airy citrus breeze and lemon zest on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-036",
      "author": "Rahul Saxena",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of airy citrus breeze and lemon zest all day long.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-037",
      "author": "Tushar Banerjee",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The airy citrus breeze opening is bright and luxurious, leading into delicate jasmine with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-038",
      "author": "Rhea Mukherjee",
      "rating": 4,
      "date": "2 months ago",
      "title": "Outstanding fragrance, strong for the first 8 hours",
      "comment": "I collect niche perfumes and Zephyrine easily holds its own against top European houses. Beautifully blended with airy citrus breeze, aromatic rosemary and smooth sandalwood.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-039",
      "author": "Rahul Saxena",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of airy citrus breeze makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-040",
      "author": "Neha Singhania",
      "rating": 5,
      "date": "3 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The airy citrus breeze note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-041",
      "author": "Rohan Mehta",
      "rating": 5,
      "date": "4 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Zephyrine for special evenings and the compliments haven't stopped. The dry down notes of airy citrus breeze and lemon zest linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-zephyrine-042",
      "author": "Ritu Agrawal",
      "rating": 5,
      "date": "5 months ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with airy citrus breeze is so crisp and invigorating, transitioning smoothly into delicate jasmine and aromatic rosemary. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    }
  ],
  "bijou": [
    {
      "id": "rev-bijou-001",
      "author": "Shweta Khandelwal",
      "rating": 4,
      "date": "Yesterday",
      "title": "Great scent & projection, wish I got the 50ml earlier",
      "comment": "I have been wearing Bijou for special evenings and the compliments haven't stopped. The dry down notes of scintillating floral bouquet and creamy sandalwood linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-bijou-002",
      "author": "Farhan Alvi",
      "rating": 5,
      "date": "2 days ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with scintillating floral bouquet is so crisp and invigorating, transitioning smoothly into sweet vanilla and patchouli. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-bijou-003",
      "author": "Pooja Chawla",
      "rating": 5,
      "date": "3 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Bijou has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-bijou-004",
      "author": "Natasha Khurana",
      "rating": 5,
      "date": "4 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating scintillating floral bouquet and soft musk notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-bijou-005",
      "author": "Aarav Sharma",
      "rating": 5,
      "date": "5 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-bijou-006",
      "author": "Anjali Bose",
      "rating": 5,
      "date": "6 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Bijou after reading about the notes (scintillating floral bouquet, creamy sandalwood, and sweet vanilla). It exceeded all my expectations! Highly recommend for anyone looking for glamorous evening scent.",
      "verified": true
    },
    {
      "id": "rev-bijou-007",
      "author": "Smriti Pandey",
      "rating": 4,
      "date": "1 week ago",
      "title": "Very high quality formulation and beautiful engraving",
      "comment": "The sillage on Bijou is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of scintillating floral bouquet and sweet vanilla is pure art.",
      "verified": true
    },
    {
      "id": "rev-bijou-008",
      "author": "Pooja Chawla",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of scintillating floral bouquet are top tier.",
      "verified": true
    },
    {
      "id": "rev-bijou-009",
      "author": "Divya Pillai",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of soft musk combined with scintillating floral bouquet create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-bijou-010",
      "author": "Ananya Roy",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Bijou is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-bijou-011",
      "author": "Yashvardhan Kulkarni",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The scintillating floral bouquet accord opens up beautifully without any alcohol blast, and settles into deep creamy sandalwood.",
      "verified": true
    },
    {
      "id": "rev-bijou-012",
      "author": "Samir Bajaj",
      "rating": 5,
      "date": "1 month ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-bijou-013",
      "author": "Sanya Goel",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love sparkling jewel energy, do not think twice. The balance of scintillating floral bouquet and patchouli is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-bijou-014",
      "author": "Rhea Mukherjee",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Bijou gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-bijou-015",
      "author": "Vicky Talwar",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of scintillating floral bouquet and creamy sandalwood on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-bijou-016",
      "author": "Akash Ganguly",
      "rating": 5,
      "date": "2 months ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of scintillating floral bouquet and creamy sandalwood all day long.",
      "verified": true
    },
    {
      "id": "rev-bijou-017",
      "author": "Ananya Roy",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The scintillating floral bouquet opening is bright and luxurious, leading into sweet vanilla with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-bijou-018",
      "author": "Radhika Murthy",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Bijou easily holds its own against top European houses. Beautifully blended with scintillating floral bouquet, patchouli and soft musk.",
      "verified": true
    },
    {
      "id": "rev-bijou-019",
      "author": "Priya Nair",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of scintillating floral bouquet makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-bijou-020",
      "author": "Vandana Sethi",
      "rating": 5,
      "date": "4 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The scintillating floral bouquet note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-bijou-021",
      "author": "Anjali Bose",
      "rating": 5,
      "date": "5 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Bijou for special evenings and the compliments haven't stopped. The dry down notes of scintillating floral bouquet and creamy sandalwood linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-bijou-022",
      "author": "Rajat Mittal",
      "rating": 4,
      "date": "Yesterday",
      "title": "Outstanding fragrance, strong for the first 8 hours",
      "comment": "The opening with scintillating floral bouquet is so crisp and invigorating, transitioning smoothly into sweet vanilla and patchouli. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-bijou-023",
      "author": "Nikhil Bhatia",
      "rating": 5,
      "date": "2 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Bijou has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-bijou-024",
      "author": "Aditya Joshi",
      "rating": 5,
      "date": "3 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating scintillating floral bouquet and soft musk notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-bijou-025",
      "author": "Swati Nambiar",
      "rating": 5,
      "date": "4 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-bijou-026",
      "author": "Vikramaditya K.",
      "rating": 5,
      "date": "5 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Bijou after reading about the notes (scintillating floral bouquet, creamy sandalwood, and sweet vanilla). It exceeded all my expectations! Highly recommend for anyone looking for glamorous evening scent.",
      "verified": true
    },
    {
      "id": "rev-bijou-027",
      "author": "Geetika Chopra",
      "rating": 5,
      "date": "6 days ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Bijou is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of scintillating floral bouquet and sweet vanilla is pure art.",
      "verified": true
    },
    {
      "id": "rev-bijou-028",
      "author": "Pallavi Menon",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of scintillating floral bouquet are top tier.",
      "verified": true
    },
    {
      "id": "rev-bijou-029",
      "author": "Siddharth Verma",
      "rating": 5,
      "date": "1 week ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of soft musk combined with scintillating floral bouquet create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-bijou-030",
      "author": "Rishabh Jain",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Bijou is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-bijou-031",
      "author": "Tarun Mathur",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The scintillating floral bouquet accord opens up beautifully without any alcohol blast, and settles into deep creamy sandalwood.",
      "verified": true
    },
    {
      "id": "rev-bijou-032",
      "author": "Geetika Chopra",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-bijou-033",
      "author": "Priya Nair",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love sparkling jewel energy, do not think twice. The balance of scintillating floral bouquet and patchouli is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-bijou-034",
      "author": "Tushar Banerjee",
      "rating": 5,
      "date": "1 month ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Bijou gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-bijou-035",
      "author": "Sonali Hegde",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of scintillating floral bouquet and creamy sandalwood on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-bijou-036",
      "author": "Tanvi Kapoor",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of scintillating floral bouquet and creamy sandalwood all day long.",
      "verified": true
    },
    {
      "id": "rev-bijou-037",
      "author": "Aishwarya Menon",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The scintillating floral bouquet opening is bright and luxurious, leading into sweet vanilla with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-bijou-038",
      "author": "Radhika Murthy",
      "rating": 5,
      "date": "2 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Bijou easily holds its own against top European houses. Beautifully blended with scintillating floral bouquet, patchouli and soft musk.",
      "verified": true
    },
    {
      "id": "rev-bijou-039",
      "author": "Girish Sundaram",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of scintillating floral bouquet makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-bijou-040",
      "author": "Uday Shenoy",
      "rating": 5,
      "date": "3 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The scintillating floral bouquet note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-bijou-041",
      "author": "Harsh Vardhan",
      "rating": 5,
      "date": "4 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Bijou for special evenings and the compliments haven't stopped. The dry down notes of scintillating floral bouquet and creamy sandalwood linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-bijou-042",
      "author": "Kabir Sen",
      "rating": 5,
      "date": "5 months ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with scintillating floral bouquet is so crisp and invigorating, transitioning smoothly into sweet vanilla and patchouli. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-bijou-043",
      "author": "Vandana Sethi",
      "rating": 5,
      "date": "Yesterday",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Bijou has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-bijou-044",
      "author": "Jhanvi Mittal",
      "rating": 5,
      "date": "2 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating scintillating floral bouquet and soft musk notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-bijou-045",
      "author": "Tarun Mathur",
      "rating": 5,
      "date": "3 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    }
  ],
  "dapper": [
    {
      "id": "rev-dapper-001",
      "author": "Gaurav Trivedi",
      "rating": 5,
      "date": "Yesterday",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Dapper for special evenings and the compliments haven't stopped. The dry down notes of bold pipe tobacco and spicy clove linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-dapper-002",
      "author": "Akash Ganguly",
      "rating": 5,
      "date": "2 days ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with bold pipe tobacco is so crisp and invigorating, transitioning smoothly into aged cedarwood and creamy sandalwood. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-dapper-003",
      "author": "Avni Reddy",
      "rating": 5,
      "date": "3 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Dapper has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-dapper-004",
      "author": "Sonali Hegde",
      "rating": 4,
      "date": "4 days ago",
      "title": "Classy and sophisticated \u2014 great for evening wear",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating bold pipe tobacco and bold pipe tobacco notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-dapper-005",
      "author": "Pallavi Menon",
      "rating": 5,
      "date": "5 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-dapper-006",
      "author": "Neha Singhania",
      "rating": 5,
      "date": "6 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Dapper after reading about the notes (bold pipe tobacco, aged cedarwood, and creamy sandalwood). It exceeded all my expectations! Highly recommend for anyone looking for rich vintage warmth.",
      "verified": true
    },
    {
      "id": "rev-dapper-007",
      "author": "Ishaan Malhotra",
      "rating": 5,
      "date": "1 week ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Dapper is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of bold pipe tobacco and creamy sandalwood is pure art.",
      "verified": true
    },
    {
      "id": "rev-dapper-008",
      "author": "Aditya Joshi",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of bold pipe tobacco are top tier.",
      "verified": true
    },
    {
      "id": "rev-dapper-009",
      "author": "Mihir Bhatt",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of spicy clove combined with aged cedarwood create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-dapper-010",
      "author": "Aishwarya Menon",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Dapper is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-dapper-011",
      "author": "Radhika Murthy",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The bold pipe tobacco accord opens up beautifully without any alcohol blast, and settles into deep creamy sandalwood.",
      "verified": true
    },
    {
      "id": "rev-dapper-012",
      "author": "Harsh Vardhan",
      "rating": 5,
      "date": "1 month ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-dapper-013",
      "author": "Karan Bhasin",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love gentleman in a bespoke suit, do not think twice. The balance of bold pipe tobacco and spicy clove is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-dapper-014",
      "author": "Devendra Rathore",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Dapper gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-dapper-015",
      "author": "Tushar Banerjee",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of creamy sandalwood and bold pipe tobacco on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-dapper-016",
      "author": "Vandana Sethi",
      "rating": 5,
      "date": "2 months ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of bold pipe tobacco and bold pipe tobacco all day long.",
      "verified": true
    },
    {
      "id": "rev-dapper-017",
      "author": "Vandana Sethi",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The bold pipe tobacco opening is bright and luxurious, leading into spicy clove with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-dapper-018",
      "author": "Geetika Chopra",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Dapper easily holds its own against top European houses. Beautifully blended with bold pipe tobacco, aged cedarwood and creamy sandalwood.",
      "verified": true
    },
    {
      "id": "rev-dapper-019",
      "author": "Nikhil Bhatia",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of bold pipe tobacco makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-dapper-020",
      "author": "Ayaan Qureshi",
      "rating": 5,
      "date": "4 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The bold pipe tobacco note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-dapper-021",
      "author": "Bhavna Kaushik",
      "rating": 5,
      "date": "5 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Dapper for special evenings and the compliments haven't stopped. The dry down notes of bold pipe tobacco and spicy clove linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-dapper-022",
      "author": "Shreya Dasgupta",
      "rating": 5,
      "date": "Yesterday",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with bold pipe tobacco is so crisp and invigorating, transitioning smoothly into aged cedarwood and creamy sandalwood. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-dapper-023",
      "author": "Siddharth Verma",
      "rating": 5,
      "date": "2 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Dapper has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-dapper-024",
      "author": "Samir Bajaj",
      "rating": 5,
      "date": "3 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating bold pipe tobacco and bold pipe tobacco notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-dapper-025",
      "author": "Kavya Patel",
      "rating": 5,
      "date": "4 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-dapper-026",
      "author": "Kritika Soni",
      "rating": 5,
      "date": "5 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Dapper after reading about the notes (bold pipe tobacco, aged cedarwood, and creamy sandalwood). It exceeded all my expectations! Highly recommend for anyone looking for rich vintage warmth.",
      "verified": true
    },
    {
      "id": "rev-dapper-027",
      "author": "Kunal Grover",
      "rating": 5,
      "date": "6 days ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Dapper is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of bold pipe tobacco and creamy sandalwood is pure art.",
      "verified": true
    },
    {
      "id": "rev-dapper-028",
      "author": "Kabir Sen",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of bold pipe tobacco are top tier.",
      "verified": true
    },
    {
      "id": "rev-dapper-029",
      "author": "Ishaan Malhotra",
      "rating": 5,
      "date": "1 week ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of spicy clove combined with aged cedarwood create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-dapper-030",
      "author": "Jhanvi Mittal",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Dapper is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-dapper-031",
      "author": "Alok Sengupta",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The bold pipe tobacco accord opens up beautifully without any alcohol blast, and settles into deep creamy sandalwood.",
      "verified": true
    },
    {
      "id": "rev-dapper-032",
      "author": "Karan Bhasin",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-dapper-033",
      "author": "Pooja Chawla",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love gentleman in a bespoke suit, do not think twice. The balance of bold pipe tobacco and spicy clove is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-dapper-034",
      "author": "Chirag Singhal",
      "rating": 5,
      "date": "1 month ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Dapper gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-dapper-035",
      "author": "Tarun Mathur",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of creamy sandalwood and bold pipe tobacco on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-dapper-036",
      "author": "Deepak Rao",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of bold pipe tobacco and bold pipe tobacco all day long.",
      "verified": true
    },
    {
      "id": "rev-dapper-037",
      "author": "Akash Ganguly",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The bold pipe tobacco opening is bright and luxurious, leading into spicy clove with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-dapper-038",
      "author": "Shweta Khandelwal",
      "rating": 5,
      "date": "2 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Dapper easily holds its own against top European houses. Beautifully blended with bold pipe tobacco, aged cedarwood and creamy sandalwood.",
      "verified": true
    },
    {
      "id": "rev-dapper-039",
      "author": "Payal Ahuja",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of bold pipe tobacco makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-dapper-040",
      "author": "Rhea Mukherjee",
      "rating": 5,
      "date": "3 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The bold pipe tobacco note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-dapper-041",
      "author": "Anjali Bose",
      "rating": 5,
      "date": "4 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Dapper for special evenings and the compliments haven't stopped. The dry down notes of bold pipe tobacco and spicy clove linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    }
  ],
  "le-chocolat": [
    {
      "id": "rev-le-chocolat-001",
      "author": "Sonali Hegde",
      "rating": 5,
      "date": "Yesterday",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Le Chocolat for special evenings and the compliments haven't stopped. The dry down notes of decadent dark cocoa and creamy Madagascar vanilla linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-002",
      "author": "Sanya Goel",
      "rating": 5,
      "date": "2 days ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with decadent dark cocoa is so crisp and invigorating, transitioning smoothly into warm cinnamon bark and rich sandalwood. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-003",
      "author": "Akash Ganguly",
      "rating": 5,
      "date": "3 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Le Chocolat has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-004",
      "author": "Tarun Mathur",
      "rating": 5,
      "date": "4 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating decadent dark cocoa and decadent dark cocoa notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-005",
      "author": "Siddharth Verma",
      "rating": 4,
      "date": "5 days ago",
      "title": "Great scent & projection, wish I got the 50ml earlier",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-006",
      "author": "Simran Gill",
      "rating": 5,
      "date": "6 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Le Chocolat after reading about the notes (decadent dark cocoa, warm cinnamon bark, and rich sandalwood). It exceeded all my expectations! Highly recommend for anyone looking for warm cozy hot cocoa.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-007",
      "author": "Aishwarya Menon",
      "rating": 4,
      "date": "1 week ago",
      "title": "Very high quality formulation and beautiful engraving",
      "comment": "The sillage on Le Chocolat is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of decadent dark cocoa and rich sandalwood is pure art.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-008",
      "author": "Aditya Joshi",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of decadent dark cocoa are top tier.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-009",
      "author": "Nidhi Agarwal",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of creamy Madagascar vanilla combined with warm cinnamon bark create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-010",
      "author": "Priya Nair",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Le Chocolat is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-011",
      "author": "Karan Bhasin",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The decadent dark cocoa accord opens up beautifully without any alcohol blast, and settles into deep rich sandalwood.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-012",
      "author": "Kritika Soni",
      "rating": 5,
      "date": "1 month ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-013",
      "author": "Neha Singhania",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love edible gourmand perfection, do not think twice. The balance of decadent dark cocoa and creamy Madagascar vanilla is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-014",
      "author": "Nidhi Agarwal",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Le Chocolat gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-015",
      "author": "Kunal Grover",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of rich sandalwood and decadent dark cocoa on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-016",
      "author": "Kavya Patel",
      "rating": 5,
      "date": "2 months ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of decadent dark cocoa and decadent dark cocoa all day long.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-017",
      "author": "Ishaan Malhotra",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The decadent dark cocoa opening is bright and luxurious, leading into creamy Madagascar vanilla with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-018",
      "author": "Aarav Sharma",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Le Chocolat easily holds its own against top European houses. Beautifully blended with decadent dark cocoa, warm cinnamon bark and rich sandalwood.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-019",
      "author": "Shreya Dasgupta",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of decadent dark cocoa makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-020",
      "author": "Deepak Rao",
      "rating": 5,
      "date": "4 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The decadent dark cocoa note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-021",
      "author": "Alok Sengupta",
      "rating": 5,
      "date": "5 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Le Chocolat for special evenings and the compliments haven't stopped. The dry down notes of decadent dark cocoa and creamy Madagascar vanilla linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-022",
      "author": "Yashvardhan Kulkarni",
      "rating": 5,
      "date": "Yesterday",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with decadent dark cocoa is so crisp and invigorating, transitioning smoothly into warm cinnamon bark and rich sandalwood. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-023",
      "author": "Rahul Saxena",
      "rating": 5,
      "date": "2 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Le Chocolat has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-024",
      "author": "Ritu Agrawal",
      "rating": 5,
      "date": "3 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating decadent dark cocoa and decadent dark cocoa notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-025",
      "author": "Yashvardhan Kulkarni",
      "rating": 5,
      "date": "4 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-026",
      "author": "Natasha Khurana",
      "rating": 4,
      "date": "5 days ago",
      "title": "Outstanding fragrance, strong for the first 8 hours",
      "comment": "Blind bought Le Chocolat after reading about the notes (decadent dark cocoa, warm cinnamon bark, and rich sandalwood). It exceeded all my expectations! Highly recommend for anyone looking for warm cozy hot cocoa.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-027",
      "author": "Swati Nambiar",
      "rating": 5,
      "date": "6 days ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Le Chocolat is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of decadent dark cocoa and rich sandalwood is pure art.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-028",
      "author": "Devendra Rathore",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of decadent dark cocoa are top tier.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-029",
      "author": "Rishabh Jain",
      "rating": 5,
      "date": "1 week ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of creamy Madagascar vanilla combined with warm cinnamon bark create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-030",
      "author": "Vicky Talwar",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Le Chocolat is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-031",
      "author": "Sonali Hegde",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The decadent dark cocoa accord opens up beautifully without any alcohol blast, and settles into deep rich sandalwood.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-032",
      "author": "Shweta Khandelwal",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-033",
      "author": "Sanya Goel",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love edible gourmand perfection, do not think twice. The balance of decadent dark cocoa and creamy Madagascar vanilla is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-034",
      "author": "Divya Pillai",
      "rating": 5,
      "date": "1 month ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Le Chocolat gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-035",
      "author": "Rishabh Jain",
      "rating": 4,
      "date": "5 weeks ago",
      "title": "Very high quality formulation and beautiful engraving",
      "comment": "The drydown of rich sandalwood and decadent dark cocoa on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-036",
      "author": "Vikramaditya K.",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of decadent dark cocoa and decadent dark cocoa all day long.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-037",
      "author": "Avni Reddy",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The decadent dark cocoa opening is bright and luxurious, leading into creamy Madagascar vanilla with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-038",
      "author": "Uday Shenoy",
      "rating": 5,
      "date": "2 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Le Chocolat easily holds its own against top European houses. Beautifully blended with decadent dark cocoa, warm cinnamon bark and rich sandalwood.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-039",
      "author": "Jhanvi Mittal",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of decadent dark cocoa makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-040",
      "author": "Neha Singhania",
      "rating": 5,
      "date": "3 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The decadent dark cocoa note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-041",
      "author": "Shweta Khandelwal",
      "rating": 5,
      "date": "4 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Le Chocolat for special evenings and the compliments haven't stopped. The dry down notes of decadent dark cocoa and creamy Madagascar vanilla linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-042",
      "author": "Vandana Sethi",
      "rating": 5,
      "date": "5 months ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with decadent dark cocoa is so crisp and invigorating, transitioning smoothly into warm cinnamon bark and rich sandalwood. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-043",
      "author": "Aditya Joshi",
      "rating": 4,
      "date": "Yesterday",
      "title": "Very high quality formulation and beautiful engraving",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Le Chocolat has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-044",
      "author": "Zoya Merchant",
      "rating": 5,
      "date": "2 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating decadent dark cocoa and decadent dark cocoa notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-045",
      "author": "Geetika Chopra",
      "rating": 4,
      "date": "3 days ago",
      "title": "Great scent & projection, wish I got the 50ml earlier",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-046",
      "author": "Rajat Mittal",
      "rating": 5,
      "date": "4 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Le Chocolat after reading about the notes (decadent dark cocoa, warm cinnamon bark, and rich sandalwood). It exceeded all my expectations! Highly recommend for anyone looking for warm cozy hot cocoa.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-047",
      "author": "Vikramaditya K.",
      "rating": 5,
      "date": "5 days ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Le Chocolat is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of decadent dark cocoa and rich sandalwood is pure art.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-048",
      "author": "Sunil Goswami",
      "rating": 5,
      "date": "6 days ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of decadent dark cocoa are top tier.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-049",
      "author": "Gaurav Trivedi",
      "rating": 5,
      "date": "1 week ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of creamy Madagascar vanilla combined with warm cinnamon bark create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-050",
      "author": "Pranav Vashisht",
      "rating": 5,
      "date": "1 week ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Le Chocolat is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-051",
      "author": "Ishaan Malhotra",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The decadent dark cocoa accord opens up beautifully without any alcohol blast, and settles into deep rich sandalwood.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-052",
      "author": "Ayaan Qureshi",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-le-chocolat-053",
      "author": "Devendra Rathore",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love edible gourmand perfection, do not think twice. The balance of decadent dark cocoa and creamy Madagascar vanilla is balanced to perfection.",
      "verified": true
    }
  ],
  "pc-leather": [
    {
      "id": "rev-pc-leather-001",
      "author": "Tushar Banerjee",
      "rating": 5,
      "date": "Yesterday",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing PC Leather for special evenings and the compliments haven't stopped. The dry down notes of fine Italian leather and warm woody spices linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-002",
      "author": "Bhavna Kaushik",
      "rating": 5,
      "date": "2 days ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with fine Italian leather is so crisp and invigorating, transitioning smoothly into rich sandalwood and amber resin. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-003",
      "author": "Aditya Joshi",
      "rating": 5,
      "date": "3 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. PC Leather has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-004",
      "author": "Rhea Mukherjee",
      "rating": 5,
      "date": "4 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating fine Italian leather and smoky musk notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-005",
      "author": "Tarun Mathur",
      "rating": 5,
      "date": "5 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-pc-leather-006",
      "author": "Pranav Vashisht",
      "rating": 5,
      "date": "6 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought PC Leather after reading about the notes (fine Italian leather, warm woody spices, and rich sandalwood). It exceeded all my expectations! Highly recommend for anyone looking for commanding boardroom presence.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-007",
      "author": "Samir Bajaj",
      "rating": 5,
      "date": "1 week ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on PC Leather is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of fine Italian leather and rich sandalwood is pure art.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-008",
      "author": "Vicky Talwar",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of fine Italian leather are top tier.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-009",
      "author": "Divya Pillai",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of smoky musk combined with fine Italian leather create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-010",
      "author": "Akash Ganguly",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. PC Leather is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-011",
      "author": "Smriti Pandey",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The fine Italian leather accord opens up beautifully without any alcohol blast, and settles into deep warm woody spices.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-012",
      "author": "Arjun Deshmukh",
      "rating": 5,
      "date": "1 month ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-013",
      "author": "Meera Iyer",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love luxury new car interior & leather jacket, do not think twice. The balance of fine Italian leather and amber resin is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-014",
      "author": "Kavya Patel",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing PC Leather gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-015",
      "author": "Jhanvi Mittal",
      "rating": 4,
      "date": "6 weeks ago",
      "title": "Very high quality formulation and beautiful engraving",
      "comment": "The drydown of fine Italian leather and warm woody spices on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-016",
      "author": "Bhavna Kaushik",
      "rating": 5,
      "date": "2 months ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of fine Italian leather and warm woody spices all day long.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-017",
      "author": "Farhan Alvi",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The fine Italian leather opening is bright and luxurious, leading into rich sandalwood with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-018",
      "author": "Tanvi Kapoor",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and PC Leather easily holds its own against top European houses. Beautifully blended with fine Italian leather, amber resin and smoky musk.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-019",
      "author": "Rohan Mehta",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of fine Italian leather makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-020",
      "author": "Anjali Bose",
      "rating": 5,
      "date": "4 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The fine Italian leather note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-021",
      "author": "Chirag Singhal",
      "rating": 5,
      "date": "5 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing PC Leather for special evenings and the compliments haven't stopped. The dry down notes of fine Italian leather and warm woody spices linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-022",
      "author": "Neha Singhania",
      "rating": 5,
      "date": "Yesterday",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with fine Italian leather is so crisp and invigorating, transitioning smoothly into rich sandalwood and amber resin. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-023",
      "author": "Radhika Murthy",
      "rating": 5,
      "date": "2 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. PC Leather has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-024",
      "author": "Natasha Khurana",
      "rating": 5,
      "date": "3 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating fine Italian leather and smoky musk notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-025",
      "author": "Ishaan Malhotra",
      "rating": 5,
      "date": "4 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-pc-leather-026",
      "author": "Rahul Saxena",
      "rating": 5,
      "date": "5 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought PC Leather after reading about the notes (fine Italian leather, warm woody spices, and rich sandalwood). It exceeded all my expectations! Highly recommend for anyone looking for commanding boardroom presence.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-027",
      "author": "Avni Reddy",
      "rating": 5,
      "date": "6 days ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on PC Leather is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of fine Italian leather and rich sandalwood is pure art.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-028",
      "author": "Swati Nambiar",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of fine Italian leather are top tier.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-029",
      "author": "Arjun Deshmukh",
      "rating": 5,
      "date": "1 week ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of smoky musk combined with fine Italian leather create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-030",
      "author": "Aishwarya Menon",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. PC Leather is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-031",
      "author": "Zoya Merchant",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The fine Italian leather accord opens up beautifully without any alcohol blast, and settles into deep warm woody spices.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-032",
      "author": "Karan Bhasin",
      "rating": 4,
      "date": "3 weeks ago",
      "title": "Classy and sophisticated \u2014 great for evening wear",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-033",
      "author": "Ishaan Malhotra",
      "rating": 4,
      "date": "1 month ago",
      "title": "Great scent & projection, wish I got the 50ml earlier",
      "comment": "If you love luxury new car interior & leather jacket, do not think twice. The balance of fine Italian leather and amber resin is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-034",
      "author": "Shweta Khandelwal",
      "rating": 5,
      "date": "1 month ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing PC Leather gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-035",
      "author": "Kabir Sen",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of fine Italian leather and warm woody spices on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-036",
      "author": "Smriti Pandey",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of fine Italian leather and warm woody spices all day long.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-037",
      "author": "Varun Chauhan",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The fine Italian leather opening is bright and luxurious, leading into rich sandalwood with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-038",
      "author": "Kavya Patel",
      "rating": 5,
      "date": "2 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and PC Leather easily holds its own against top European houses. Beautifully blended with fine Italian leather, amber resin and smoky musk.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-039",
      "author": "Girish Sundaram",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of fine Italian leather makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-040",
      "author": "Radhika Murthy",
      "rating": 4,
      "date": "3 months ago",
      "title": "Classy and sophisticated \u2014 great for evening wear",
      "comment": "Such a memorable fragrance profile. The fine Italian leather note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-041",
      "author": "Sanya Goel",
      "rating": 5,
      "date": "4 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing PC Leather for special evenings and the compliments haven't stopped. The dry down notes of fine Italian leather and warm woody spices linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-042",
      "author": "Mihir Bhatt",
      "rating": 5,
      "date": "5 months ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with fine Italian leather is so crisp and invigorating, transitioning smoothly into rich sandalwood and amber resin. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-043",
      "author": "Ritu Agrawal",
      "rating": 5,
      "date": "Yesterday",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. PC Leather has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-044",
      "author": "Mihir Bhatt",
      "rating": 4,
      "date": "2 days ago",
      "title": "Classy and sophisticated \u2014 great for evening wear",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating fine Italian leather and smoky musk notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-045",
      "author": "Sanya Goel",
      "rating": 5,
      "date": "3 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-pc-leather-046",
      "author": "Priya Nair",
      "rating": 5,
      "date": "4 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought PC Leather after reading about the notes (fine Italian leather, warm woody spices, and rich sandalwood). It exceeded all my expectations! Highly recommend for anyone looking for commanding boardroom presence.",
      "verified": true
    },
    {
      "id": "rev-pc-leather-047",
      "author": "Aarav Sharma",
      "rating": 5,
      "date": "5 days ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on PC Leather is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of fine Italian leather and rich sandalwood is pure art.",
      "verified": true
    }
  ],
  "quantillion": [
    {
      "id": "rev-quantillion-001",
      "author": "Vicky Talwar",
      "rating": 4,
      "date": "Yesterday",
      "title": "Great scent & projection, wish I got the 50ml earlier",
      "comment": "I have been wearing Quantillion for special evenings and the compliments haven't stopped. The dry down notes of vibrant mandarin and Calabrian bergamot linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-quantillion-002",
      "author": "Aditya Joshi",
      "rating": 5,
      "date": "2 days ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with vibrant mandarin is so crisp and invigorating, transitioning smoothly into spiced rose and warm cardamom. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-quantillion-003",
      "author": "Simran Gill",
      "rating": 5,
      "date": "3 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Quantillion has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-quantillion-004",
      "author": "Pallavi Menon",
      "rating": 5,
      "date": "4 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating vibrant mandarin and opulent amberwood notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-quantillion-005",
      "author": "Nikhil Bhatia",
      "rating": 5,
      "date": "5 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-quantillion-006",
      "author": "Karan Bhasin",
      "rating": 4,
      "date": "6 days ago",
      "title": "Outstanding fragrance, strong for the first 8 hours",
      "comment": "Blind bought Quantillion after reading about the notes (vibrant mandarin, Calabrian bergamot, and spiced rose). It exceeded all my expectations! Highly recommend for anyone looking for sparkling citrus luxury.",
      "verified": true
    },
    {
      "id": "rev-quantillion-007",
      "author": "Simran Gill",
      "rating": 5,
      "date": "1 week ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Quantillion is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of vibrant mandarin and spiced rose is pure art.",
      "verified": true
    },
    {
      "id": "rev-quantillion-008",
      "author": "Gaurav Trivedi",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of vibrant mandarin are top tier.",
      "verified": true
    },
    {
      "id": "rev-quantillion-009",
      "author": "Pranav Vashisht",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of opulent amberwood combined with vibrant mandarin create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-quantillion-010",
      "author": "Sanya Goel",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Quantillion is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-quantillion-011",
      "author": "Yashvardhan Kulkarni",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The vibrant mandarin accord opens up beautifully without any alcohol blast, and settles into deep Calabrian bergamot.",
      "verified": true
    },
    {
      "id": "rev-quantillion-012",
      "author": "Kabir Sen",
      "rating": 5,
      "date": "1 month ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-quantillion-013",
      "author": "Natasha Khurana",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love radiant sporty energy, do not think twice. The balance of vibrant mandarin and warm cardamom is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-quantillion-014",
      "author": "Bhavna Kaushik",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Quantillion gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-quantillion-015",
      "author": "Manish Bhardwaj",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of vibrant mandarin and Calabrian bergamot on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-quantillion-016",
      "author": "Shreya Dasgupta",
      "rating": 5,
      "date": "2 months ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of vibrant mandarin and Calabrian bergamot all day long.",
      "verified": true
    },
    {
      "id": "rev-quantillion-017",
      "author": "Mihir Bhatt",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The vibrant mandarin opening is bright and luxurious, leading into spiced rose with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-quantillion-018",
      "author": "Neha Singhania",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Quantillion easily holds its own against top European houses. Beautifully blended with vibrant mandarin, warm cardamom and opulent amberwood.",
      "verified": true
    },
    {
      "id": "rev-quantillion-019",
      "author": "Tushar Banerjee",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of vibrant mandarin makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-quantillion-020",
      "author": "Girish Sundaram",
      "rating": 5,
      "date": "4 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The vibrant mandarin note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-quantillion-021",
      "author": "Uday Shenoy",
      "rating": 5,
      "date": "5 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Quantillion for special evenings and the compliments haven't stopped. The dry down notes of vibrant mandarin and Calabrian bergamot linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-quantillion-022",
      "author": "Kunal Grover",
      "rating": 5,
      "date": "Yesterday",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with vibrant mandarin is so crisp and invigorating, transitioning smoothly into spiced rose and warm cardamom. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-quantillion-023",
      "author": "Nikhil Bhatia",
      "rating": 4,
      "date": "2 days ago",
      "title": "Very high quality formulation and beautiful engraving",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Quantillion has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-quantillion-024",
      "author": "Tushar Banerjee",
      "rating": 5,
      "date": "3 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating vibrant mandarin and opulent amberwood notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-quantillion-025",
      "author": "Meera Iyer",
      "rating": 5,
      "date": "4 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-quantillion-026",
      "author": "Samir Bajaj",
      "rating": 5,
      "date": "5 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Quantillion after reading about the notes (vibrant mandarin, Calabrian bergamot, and spiced rose). It exceeded all my expectations! Highly recommend for anyone looking for sparkling citrus luxury.",
      "verified": true
    },
    {
      "id": "rev-quantillion-027",
      "author": "Chirag Singhal",
      "rating": 5,
      "date": "6 days ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Quantillion is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of vibrant mandarin and spiced rose is pure art.",
      "verified": true
    },
    {
      "id": "rev-quantillion-028",
      "author": "Sonali Hegde",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of vibrant mandarin are top tier.",
      "verified": true
    },
    {
      "id": "rev-quantillion-029",
      "author": "Rajat Mittal",
      "rating": 5,
      "date": "1 week ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of opulent amberwood combined with vibrant mandarin create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-quantillion-030",
      "author": "Radhika Murthy",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Quantillion is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-quantillion-031",
      "author": "Sonali Hegde",
      "rating": 4,
      "date": "2 weeks ago",
      "title": "Very high quality formulation and beautiful engraving",
      "comment": "The quality of raw ingredients is evident from the first spray. The vibrant mandarin accord opens up beautifully without any alcohol blast, and settles into deep Calabrian bergamot.",
      "verified": true
    },
    {
      "id": "rev-quantillion-032",
      "author": "Vikramaditya K.",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-quantillion-033",
      "author": "Smriti Pandey",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love radiant sporty energy, do not think twice. The balance of vibrant mandarin and warm cardamom is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-quantillion-034",
      "author": "Kritika Soni",
      "rating": 4,
      "date": "1 month ago",
      "title": "Outstanding fragrance, strong for the first 8 hours",
      "comment": "Wearing Quantillion gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-quantillion-035",
      "author": "Aishwarya Menon",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of vibrant mandarin and Calabrian bergamot on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-quantillion-036",
      "author": "Avni Reddy",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of vibrant mandarin and Calabrian bergamot all day long.",
      "verified": true
    },
    {
      "id": "rev-quantillion-037",
      "author": "Payal Ahuja",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The vibrant mandarin opening is bright and luxurious, leading into spiced rose with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-quantillion-038",
      "author": "Vandana Sethi",
      "rating": 5,
      "date": "2 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Quantillion easily holds its own against top European houses. Beautifully blended with vibrant mandarin, warm cardamom and opulent amberwood.",
      "verified": true
    },
    {
      "id": "rev-quantillion-039",
      "author": "Ishaan Malhotra",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of vibrant mandarin makes this a 10/10 purchase.",
      "verified": true
    }
  ],
  "reiz": [
    {
      "id": "rev-reiz-001",
      "author": "Ayaan Qureshi",
      "rating": 5,
      "date": "Yesterday",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Reiz for special evenings and the compliments haven't stopped. The dry down notes of effervescent lemon and zesty orange linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-reiz-002",
      "author": "Anjali Bose",
      "rating": 5,
      "date": "2 days ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with effervescent lemon is so crisp and invigorating, transitioning smoothly into sweet cinnamon and green cardamom. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-reiz-003",
      "author": "Uday Shenoy",
      "rating": 5,
      "date": "3 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Reiz has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-reiz-004",
      "author": "Rishabh Jain",
      "rating": 5,
      "date": "4 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating effervescent lemon and mysterious musk notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-reiz-005",
      "author": "Priya Nair",
      "rating": 5,
      "date": "5 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-reiz-006",
      "author": "Bhavna Kaushik",
      "rating": 5,
      "date": "6 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Reiz after reading about the notes (effervescent lemon, zesty orange, and sweet cinnamon). It exceeded all my expectations! Highly recommend for anyone looking for sparkling spiced freshness.",
      "verified": true
    },
    {
      "id": "rev-reiz-007",
      "author": "Kavya Patel",
      "rating": 4,
      "date": "1 week ago",
      "title": "Very high quality formulation and beautiful engraving",
      "comment": "The sillage on Reiz is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of effervescent lemon and sweet cinnamon is pure art.",
      "verified": true
    },
    {
      "id": "rev-reiz-008",
      "author": "Vikramaditya K.",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of effervescent lemon are top tier.",
      "verified": true
    },
    {
      "id": "rev-reiz-009",
      "author": "Yashvardhan Kulkarni",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of mysterious musk combined with effervescent lemon create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-reiz-010",
      "author": "Alok Sengupta",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Reiz is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-reiz-011",
      "author": "Pranav Vashisht",
      "rating": 4,
      "date": "3 weeks ago",
      "title": "Very high quality formulation and beautiful engraving",
      "comment": "The quality of raw ingredients is evident from the first spray. The effervescent lemon accord opens up beautifully without any alcohol blast, and settles into deep zesty orange.",
      "verified": true
    },
    {
      "id": "rev-reiz-012",
      "author": "Karan Bhasin",
      "rating": 5,
      "date": "1 month ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-reiz-013",
      "author": "Rohan Mehta",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love dynamic infectious charm, do not think twice. The balance of effervescent lemon and green cardamom is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-reiz-014",
      "author": "Alok Sengupta",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Reiz gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-reiz-015",
      "author": "Arjun Deshmukh",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of effervescent lemon and zesty orange on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-reiz-016",
      "author": "Priya Nair",
      "rating": 4,
      "date": "2 months ago",
      "title": "Classy and sophisticated \u2014 great for evening wear",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of effervescent lemon and zesty orange all day long.",
      "verified": true
    },
    {
      "id": "rev-reiz-017",
      "author": "Ayaan Qureshi",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The effervescent lemon opening is bright and luxurious, leading into sweet cinnamon with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-reiz-018",
      "author": "Rhea Mukherjee",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Reiz easily holds its own against top European houses. Beautifully blended with effervescent lemon, green cardamom and mysterious musk.",
      "verified": true
    },
    {
      "id": "rev-reiz-019",
      "author": "Pallavi Menon",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of effervescent lemon makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-reiz-020",
      "author": "Samir Bajaj",
      "rating": 5,
      "date": "4 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The effervescent lemon note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-reiz-021",
      "author": "Nikhil Bhatia",
      "rating": 5,
      "date": "5 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Reiz for special evenings and the compliments haven't stopped. The dry down notes of effervescent lemon and zesty orange linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-reiz-022",
      "author": "Deepak Rao",
      "rating": 5,
      "date": "Yesterday",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with effervescent lemon is so crisp and invigorating, transitioning smoothly into sweet cinnamon and green cardamom. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-reiz-023",
      "author": "Devendra Rathore",
      "rating": 5,
      "date": "2 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Reiz has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-reiz-024",
      "author": "Siddharth Verma",
      "rating": 5,
      "date": "3 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating effervescent lemon and mysterious musk notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-reiz-025",
      "author": "Vandana Sethi",
      "rating": 5,
      "date": "4 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-reiz-026",
      "author": "Geetika Chopra",
      "rating": 5,
      "date": "5 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Reiz after reading about the notes (effervescent lemon, zesty orange, and sweet cinnamon). It exceeded all my expectations! Highly recommend for anyone looking for sparkling spiced freshness.",
      "verified": true
    },
    {
      "id": "rev-reiz-027",
      "author": "Devendra Rathore",
      "rating": 5,
      "date": "6 days ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Reiz is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of effervescent lemon and sweet cinnamon is pure art.",
      "verified": true
    },
    {
      "id": "rev-reiz-028",
      "author": "Anjali Bose",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of effervescent lemon are top tier.",
      "verified": true
    },
    {
      "id": "rev-reiz-029",
      "author": "Kabir Sen",
      "rating": 5,
      "date": "1 week ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of mysterious musk combined with effervescent lemon create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-reiz-030",
      "author": "Sunil Goswami",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Reiz is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-reiz-031",
      "author": "Tanvi Kapoor",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The effervescent lemon accord opens up beautifully without any alcohol blast, and settles into deep zesty orange.",
      "verified": true
    },
    {
      "id": "rev-reiz-032",
      "author": "Nidhi Agarwal",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-reiz-033",
      "author": "Vicky Talwar",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love dynamic infectious charm, do not think twice. The balance of effervescent lemon and green cardamom is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-reiz-034",
      "author": "Kavya Patel",
      "rating": 5,
      "date": "1 month ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Reiz gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-reiz-035",
      "author": "Vikramaditya K.",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of effervescent lemon and zesty orange on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-reiz-036",
      "author": "Sunil Goswami",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of effervescent lemon and zesty orange all day long.",
      "verified": true
    },
    {
      "id": "rev-reiz-037",
      "author": "Rhea Mukherjee",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The effervescent lemon opening is bright and luxurious, leading into sweet cinnamon with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-reiz-038",
      "author": "Uday Shenoy",
      "rating": 5,
      "date": "2 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Reiz easily holds its own against top European houses. Beautifully blended with effervescent lemon, green cardamom and mysterious musk.",
      "verified": true
    },
    {
      "id": "rev-reiz-039",
      "author": "Ishaan Malhotra",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of effervescent lemon makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-reiz-040",
      "author": "Swati Nambiar",
      "rating": 5,
      "date": "3 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The effervescent lemon note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-reiz-041",
      "author": "Varun Chauhan",
      "rating": 5,
      "date": "4 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Reiz for special evenings and the compliments haven't stopped. The dry down notes of effervescent lemon and zesty orange linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-reiz-042",
      "author": "Pooja Chawla",
      "rating": 4,
      "date": "5 months ago",
      "title": "Outstanding fragrance, strong for the first 8 hours",
      "comment": "The opening with effervescent lemon is so crisp and invigorating, transitioning smoothly into sweet cinnamon and green cardamom. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-reiz-043",
      "author": "Natasha Khurana",
      "rating": 5,
      "date": "Yesterday",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Reiz has become an instant staple on my vanity.",
      "verified": true
    }
  ],
  "sent-aura": [
    {
      "id": "rev-sent-aura-001",
      "author": "Shweta Khandelwal",
      "rating": 5,
      "date": "Yesterday",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Sent-Aura for special evenings and the compliments haven't stopped. The dry down notes of crisp juicy pear and Calabrian bergamot linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-002",
      "author": "Jhanvi Mittal",
      "rating": 5,
      "date": "2 days ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with crisp juicy pear is so crisp and invigorating, transitioning smoothly into soothing green tea and ethereal violet. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-003",
      "author": "Aditya Joshi",
      "rating": 5,
      "date": "3 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Sent-Aura has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-004",
      "author": "Rishabh Jain",
      "rating": 5,
      "date": "4 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating crisp juicy pear and clean cedarwood notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-005",
      "author": "Ishaan Malhotra",
      "rating": 5,
      "date": "5 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-sent-aura-006",
      "author": "Vandana Sethi",
      "rating": 5,
      "date": "6 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Sent-Aura after reading about the notes (crisp juicy pear, Calabrian bergamot, and soothing green tea). It exceeded all my expectations! Highly recommend for anyone looking for tranquil morning garden.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-007",
      "author": "Akash Ganguly",
      "rating": 5,
      "date": "1 week ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Sent-Aura is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of crisp juicy pear and soothing green tea is pure art.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-008",
      "author": "Pallavi Menon",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of crisp juicy pear are top tier.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-009",
      "author": "Siddharth Verma",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of clean cedarwood combined with crisp juicy pear create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-010",
      "author": "Farhan Alvi",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Sent-Aura is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-011",
      "author": "Rahul Saxena",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The crisp juicy pear accord opens up beautifully without any alcohol blast, and settles into deep Calabrian bergamot.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-012",
      "author": "Harsh Vardhan",
      "rating": 5,
      "date": "1 month ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-013",
      "author": "Rajat Mittal",
      "rating": 4,
      "date": "1 month ago",
      "title": "Great scent & projection, wish I got the 50ml earlier",
      "comment": "If you love zen spiritual peace, do not think twice. The balance of crisp juicy pear and ethereal violet is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-014",
      "author": "Devendra Rathore",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Sent-Aura gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-015",
      "author": "Samir Bajaj",
      "rating": 4,
      "date": "6 weeks ago",
      "title": "Very high quality formulation and beautiful engraving",
      "comment": "The drydown of crisp juicy pear and Calabrian bergamot on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-016",
      "author": "Payal Ahuja",
      "rating": 4,
      "date": "2 months ago",
      "title": "Classy and sophisticated \u2014 great for evening wear",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of crisp juicy pear and Calabrian bergamot all day long.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-017",
      "author": "Shweta Khandelwal",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The crisp juicy pear opening is bright and luxurious, leading into soothing green tea with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-018",
      "author": "Payal Ahuja",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Sent-Aura easily holds its own against top European houses. Beautifully blended with crisp juicy pear, ethereal violet and clean cedarwood.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-019",
      "author": "Zoya Merchant",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of crisp juicy pear makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-020",
      "author": "Sonali Hegde",
      "rating": 5,
      "date": "4 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The crisp juicy pear note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-021",
      "author": "Mihir Bhatt",
      "rating": 5,
      "date": "5 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Sent-Aura for special evenings and the compliments haven't stopped. The dry down notes of crisp juicy pear and Calabrian bergamot linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-022",
      "author": "Bhavna Kaushik",
      "rating": 4,
      "date": "Yesterday",
      "title": "Outstanding fragrance, strong for the first 8 hours",
      "comment": "The opening with crisp juicy pear is so crisp and invigorating, transitioning smoothly into soothing green tea and ethereal violet. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-023",
      "author": "Smriti Pandey",
      "rating": 5,
      "date": "2 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Sent-Aura has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-024",
      "author": "Gaurav Trivedi",
      "rating": 5,
      "date": "3 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating crisp juicy pear and clean cedarwood notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-025",
      "author": "Vicky Talwar",
      "rating": 5,
      "date": "4 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-sent-aura-026",
      "author": "Sanya Goel",
      "rating": 5,
      "date": "5 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Sent-Aura after reading about the notes (crisp juicy pear, Calabrian bergamot, and soothing green tea). It exceeded all my expectations! Highly recommend for anyone looking for tranquil morning garden.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-027",
      "author": "Swati Nambiar",
      "rating": 5,
      "date": "6 days ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Sent-Aura is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of crisp juicy pear and soothing green tea is pure art.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-028",
      "author": "Kunal Grover",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of crisp juicy pear are top tier.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-029",
      "author": "Zoya Merchant",
      "rating": 5,
      "date": "1 week ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of clean cedarwood combined with crisp juicy pear create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-030",
      "author": "Aarav Sharma",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Sent-Aura is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-031",
      "author": "Geetika Chopra",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The crisp juicy pear accord opens up beautifully without any alcohol blast, and settles into deep Calabrian bergamot.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-032",
      "author": "Kavya Patel",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-033",
      "author": "Alok Sengupta",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love zen spiritual peace, do not think twice. The balance of crisp juicy pear and ethereal violet is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-034",
      "author": "Ayaan Qureshi",
      "rating": 4,
      "date": "1 month ago",
      "title": "Outstanding fragrance, strong for the first 8 hours",
      "comment": "Wearing Sent-Aura gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-035",
      "author": "Rajat Mittal",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of crisp juicy pear and Calabrian bergamot on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-036",
      "author": "Bhavna Kaushik",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of crisp juicy pear and Calabrian bergamot all day long.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-037",
      "author": "Arjun Deshmukh",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The crisp juicy pear opening is bright and luxurious, leading into soothing green tea with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-sent-aura-038",
      "author": "Harsh Vardhan",
      "rating": 5,
      "date": "2 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Sent-Aura easily holds its own against top European houses. Beautifully blended with crisp juicy pear, ethereal violet and clean cedarwood.",
      "verified": true
    }
  ],
  "vanaco": [
    {
      "id": "rev-vanaco-001",
      "author": "Anjali Bose",
      "rating": 5,
      "date": "Yesterday",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Vanaco for special evenings and the compliments haven't stopped. The dry down notes of exhilarating citrus and pink grapefruit linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-vanaco-002",
      "author": "Rhea Mukherjee",
      "rating": 5,
      "date": "2 days ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with exhilarating citrus is so crisp and invigorating, transitioning smoothly into crushed black pepper and cardamom. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-vanaco-003",
      "author": "Neha Singhania",
      "rating": 5,
      "date": "3 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Vanaco has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-vanaco-004",
      "author": "Vicky Talwar",
      "rating": 5,
      "date": "4 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating exhilarating citrus and earthy oakmoss notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-vanaco-005",
      "author": "Sonali Hegde",
      "rating": 5,
      "date": "5 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-vanaco-006",
      "author": "Ananya Roy",
      "rating": 5,
      "date": "6 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Vanaco after reading about the notes (exhilarating citrus, pink grapefruit, and crushed black pepper). It exceeded all my expectations! Highly recommend for anyone looking for forest breeze & spice.",
      "verified": true
    },
    {
      "id": "rev-vanaco-007",
      "author": "Tarun Mathur",
      "rating": 5,
      "date": "1 week ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Vanaco is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of exhilarating citrus and crushed black pepper is pure art.",
      "verified": true
    },
    {
      "id": "rev-vanaco-008",
      "author": "Gaurav Trivedi",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of exhilarating citrus are top tier.",
      "verified": true
    },
    {
      "id": "rev-vanaco-009",
      "author": "Nidhi Agarwal",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of earthy oakmoss combined with exhilarating citrus create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-vanaco-010",
      "author": "Aarav Sharma",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Vanaco is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-vanaco-011",
      "author": "Bhavna Kaushik",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The exhilarating citrus accord opens up beautifully without any alcohol blast, and settles into deep pink grapefruit.",
      "verified": true
    },
    {
      "id": "rev-vanaco-012",
      "author": "Kunal Grover",
      "rating": 5,
      "date": "1 month ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-vanaco-013",
      "author": "Vicky Talwar",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love adventurous outdoor spirit, do not think twice. The balance of exhilarating citrus and cardamom is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-vanaco-014",
      "author": "Devendra Rathore",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Vanaco gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-vanaco-015",
      "author": "Pallavi Menon",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of exhilarating citrus and pink grapefruit on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-vanaco-016",
      "author": "Pallavi Menon",
      "rating": 5,
      "date": "2 months ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of exhilarating citrus and pink grapefruit all day long.",
      "verified": true
    },
    {
      "id": "rev-vanaco-017",
      "author": "Zoya Merchant",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The exhilarating citrus opening is bright and luxurious, leading into crushed black pepper with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-vanaco-018",
      "author": "Avni Reddy",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Vanaco easily holds its own against top European houses. Beautifully blended with exhilarating citrus, cardamom and earthy oakmoss.",
      "verified": true
    },
    {
      "id": "rev-vanaco-019",
      "author": "Radhika Murthy",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of exhilarating citrus makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-vanaco-020",
      "author": "Alok Sengupta",
      "rating": 5,
      "date": "4 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The exhilarating citrus note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-vanaco-021",
      "author": "Meera Iyer",
      "rating": 4,
      "date": "5 months ago",
      "title": "Great scent & projection, wish I got the 50ml earlier",
      "comment": "I have been wearing Vanaco for special evenings and the compliments haven't stopped. The dry down notes of exhilarating citrus and pink grapefruit linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-vanaco-022",
      "author": "Samir Bajaj",
      "rating": 5,
      "date": "Yesterday",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with exhilarating citrus is so crisp and invigorating, transitioning smoothly into crushed black pepper and cardamom. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-vanaco-023",
      "author": "Sanya Goel",
      "rating": 5,
      "date": "2 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Vanaco has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-vanaco-024",
      "author": "Nidhi Agarwal",
      "rating": 5,
      "date": "3 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating exhilarating citrus and earthy oakmoss notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-vanaco-025",
      "author": "Varun Chauhan",
      "rating": 5,
      "date": "4 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-vanaco-026",
      "author": "Tushar Banerjee",
      "rating": 5,
      "date": "5 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Vanaco after reading about the notes (exhilarating citrus, pink grapefruit, and crushed black pepper). It exceeded all my expectations! Highly recommend for anyone looking for forest breeze & spice.",
      "verified": true
    },
    {
      "id": "rev-vanaco-027",
      "author": "Rahul Saxena",
      "rating": 4,
      "date": "6 days ago",
      "title": "Very high quality formulation and beautiful engraving",
      "comment": "The sillage on Vanaco is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of exhilarating citrus and crushed black pepper is pure art.",
      "verified": true
    },
    {
      "id": "rev-vanaco-028",
      "author": "Aditya Joshi",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of exhilarating citrus are top tier.",
      "verified": true
    },
    {
      "id": "rev-vanaco-029",
      "author": "Payal Ahuja",
      "rating": 5,
      "date": "1 week ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of earthy oakmoss combined with exhilarating citrus create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-vanaco-030",
      "author": "Sanya Goel",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Vanaco is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-vanaco-031",
      "author": "Varun Chauhan",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The exhilarating citrus accord opens up beautifully without any alcohol blast, and settles into deep pink grapefruit.",
      "verified": true
    },
    {
      "id": "rev-vanaco-032",
      "author": "Mihir Bhatt",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-vanaco-033",
      "author": "Arjun Deshmukh",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love adventurous outdoor spirit, do not think twice. The balance of exhilarating citrus and cardamom is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-vanaco-034",
      "author": "Manish Bhardwaj",
      "rating": 5,
      "date": "1 month ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Vanaco gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-vanaco-035",
      "author": "Pranav Vashisht",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of exhilarating citrus and pink grapefruit on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-vanaco-036",
      "author": "Karan Bhasin",
      "rating": 4,
      "date": "6 weeks ago",
      "title": "Classy and sophisticated \u2014 great for evening wear",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of exhilarating citrus and pink grapefruit all day long.",
      "verified": true
    },
    {
      "id": "rev-vanaco-037",
      "author": "Akash Ganguly",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The exhilarating citrus opening is bright and luxurious, leading into crushed black pepper with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-vanaco-038",
      "author": "Rishabh Jain",
      "rating": 5,
      "date": "2 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Vanaco easily holds its own against top European houses. Beautifully blended with exhilarating citrus, cardamom and earthy oakmoss.",
      "verified": true
    },
    {
      "id": "rev-vanaco-039",
      "author": "Tanvi Kapoor",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of exhilarating citrus makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-vanaco-040",
      "author": "Rohan Mehta",
      "rating": 5,
      "date": "3 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The exhilarating citrus note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    }
  ],
  "woo-dy": [
    {
      "id": "rev-woo-dy-001",
      "author": "Kritika Soni",
      "rating": 5,
      "date": "Yesterday",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Woo-Dy for special evenings and the compliments haven't stopped. The dry down notes of crisp cedarwood and aromatic cypress linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-002",
      "author": "Arjun Deshmukh",
      "rating": 5,
      "date": "2 days ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with crisp cedarwood is so crisp and invigorating, transitioning smoothly into creamy sandalwood and earthy vetiver. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-003",
      "author": "Harsh Vardhan",
      "rating": 5,
      "date": "3 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Woo-Dy has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-004",
      "author": "Swati Nambiar",
      "rating": 5,
      "date": "4 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating crisp cedarwood and resinous golden amber notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-005",
      "author": "Divya Pillai",
      "rating": 5,
      "date": "5 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-woo-dy-006",
      "author": "Geetika Chopra",
      "rating": 5,
      "date": "6 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Woo-Dy after reading about the notes (crisp cedarwood, aromatic cypress, and creamy sandalwood). It exceeded all my expectations! Highly recommend for anyone looking for meditative sandalwood peace.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-007",
      "author": "Avni Reddy",
      "rating": 5,
      "date": "1 week ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Woo-Dy is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of crisp cedarwood and creamy sandalwood is pure art.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-008",
      "author": "Tarun Mathur",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of crisp cedarwood are top tier.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-009",
      "author": "Akash Ganguly",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of resinous golden amber combined with crisp cedarwood create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-010",
      "author": "Shweta Khandelwal",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Woo-Dy is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-011",
      "author": "Ayaan Qureshi",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The crisp cedarwood accord opens up beautifully without any alcohol blast, and settles into deep aromatic cypress.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-012",
      "author": "Aarav Sharma",
      "rating": 5,
      "date": "1 month ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-013",
      "author": "Rishabh Jain",
      "rating": 5,
      "date": "1 month ago",
      "title": "Luxury redefined! Heavy glass bottle feels premium",
      "comment": "If you love deep coniferous forest, do not think twice. The balance of crisp cedarwood and earthy vetiver is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-014",
      "author": "Samir Bajaj",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Woo-Dy gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-015",
      "author": "Harsh Vardhan",
      "rating": 5,
      "date": "6 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of crisp cedarwood and aromatic cypress on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-016",
      "author": "Kavya Patel",
      "rating": 5,
      "date": "2 months ago",
      "title": "Gifted this with custom photo engraving \u2014 they loved it!",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of crisp cedarwood and aromatic cypress all day long.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-017",
      "author": "Yashvardhan Kulkarni",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The crisp cedarwood opening is bright and luxurious, leading into creamy sandalwood with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-018",
      "author": "Varun Chauhan",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Woo-Dy easily holds its own against top European houses. Beautifully blended with crisp cedarwood, earthy vetiver and resinous golden amber.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-019",
      "author": "Devendra Rathore",
      "rating": 5,
      "date": "3 months ago",
      "title": "Sentire has completely outdone themselves here",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of crisp cedarwood makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-020",
      "author": "Rohan Mehta",
      "rating": 5,
      "date": "4 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The crisp cedarwood note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-021",
      "author": "Anjali Bose",
      "rating": 5,
      "date": "5 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Woo-Dy for special evenings and the compliments haven't stopped. The dry down notes of crisp cedarwood and aromatic cypress linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-022",
      "author": "Divya Pillai",
      "rating": 4,
      "date": "Yesterday",
      "title": "Outstanding fragrance, strong for the first 8 hours",
      "comment": "The opening with crisp cedarwood is so crisp and invigorating, transitioning smoothly into creamy sandalwood and earthy vetiver. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-023",
      "author": "Rhea Mukherjee",
      "rating": 5,
      "date": "2 days ago",
      "title": "Smells like a High-End Niche Parfumerie",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Woo-Dy has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-024",
      "author": "Deepak Rao",
      "rating": 5,
      "date": "3 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating crisp cedarwood and resinous golden amber notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-025",
      "author": "Meera Iyer",
      "rating": 5,
      "date": "4 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-woo-dy-026",
      "author": "Vikramaditya K.",
      "rating": 5,
      "date": "5 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Woo-Dy after reading about the notes (crisp cedarwood, aromatic cypress, and creamy sandalwood). It exceeded all my expectations! Highly recommend for anyone looking for meditative sandalwood peace.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-027",
      "author": "Arjun Deshmukh",
      "rating": 5,
      "date": "6 days ago",
      "title": "My New Signature Scent! Lasts easily 14+ hours",
      "comment": "The sillage on Woo-Dy is magnetic. People in my office kept asking what fragrance I was wearing all afternoon. The combination of crisp cedarwood and creamy sandalwood is pure art.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-028",
      "author": "Jhanvi Mittal",
      "rating": 5,
      "date": "1 week ago",
      "title": "Extremely High Quality & Elegant Packaging",
      "comment": "Honestly one of the best Indian luxury fragrance houses today. The packaging, atomiser spray distribution, and the scent trail of crisp cedarwood are top tier.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-029",
      "author": "Chirag Singhal",
      "rating": 5,
      "date": "1 week ago",
      "title": "Worth Every Single Rupee \u2014 Niche Grade",
      "comment": "Lasts easily 12-16 hours on skin and multiple days on cotton/linen fabrics. The heart notes of resinous golden amber combined with crisp cedarwood create such a rich, comforting drydown.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-030",
      "author": "Manish Bhardwaj",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Compliments from total strangers within an hour!",
      "comment": "Bought the 10ml travel spray first, but within two days I immediately ordered the full 50ml bottle. Woo-Dy is absolute magic.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-031",
      "author": "Aditya Joshi",
      "rating": 5,
      "date": "2 weeks ago",
      "title": "Best blind buy I have ever made",
      "comment": "The quality of raw ingredients is evident from the first spray. The crisp cedarwood accord opens up beautifully without any alcohol blast, and settles into deep aromatic cypress.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-032",
      "author": "Tanvi Kapoor",
      "rating": 5,
      "date": "3 weeks ago",
      "title": "The dry down is heavenly and rich",
      "comment": "Got my bottle personalized with my monogram. Delivery to Jaipur took less than 48 hours and the unboxing experience felt like receiving high jewelry.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-033",
      "author": "Karan Bhasin",
      "rating": 4,
      "date": "1 month ago",
      "title": "Great scent & projection, wish I got the 50ml earlier",
      "comment": "If you love deep coniferous forest, do not think twice. The balance of crisp cedarwood and earthy vetiver is balanced to perfection.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-034",
      "author": "Samir Bajaj",
      "rating": 5,
      "date": "1 month ago",
      "title": "Projection is phenomenal without being headache-inducing",
      "comment": "Wearing Woo-Dy gives an immediate boost of confidence. Rich, opulent, and lasts from morning meetings all the way through dinner.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-035",
      "author": "Pooja Chawla",
      "rating": 5,
      "date": "5 weeks ago",
      "title": "Smooth blending with zero synthetic harshness",
      "comment": "The drydown of crisp cedarwood and aromatic cypress on skin is pure intimacy and sophistication. One of my most complimented fragrances ever.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-036",
      "author": "Kabir Sen",
      "rating": 4,
      "date": "6 weeks ago",
      "title": "Classy and sophisticated \u2014 great for evening wear",
      "comment": "Sentire's extrait concentration is no joke. Just 3 to 4 sprays and you are enveloped in a gorgeous scent bubble of crisp cedarwood and aromatic cypress all day long.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-037",
      "author": "Shreya Dasgupta",
      "rating": 5,
      "date": "2 months ago",
      "title": "A true extrait de parfum that stays on clothes for days",
      "comment": "Exceptional formulation! The crisp cedarwood opening is bright and luxurious, leading into creamy sandalwood with that signature noble wood base.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-038",
      "author": "Jhanvi Mittal",
      "rating": 5,
      "date": "2 months ago",
      "title": "Sophisticated, magnetic, and completely addicting",
      "comment": "I collect niche perfumes and Woo-Dy easily holds its own against top European houses. Beautifully blended with crisp cedarwood, earthy vetiver and resinous golden amber.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-039",
      "author": "Smriti Pandey",
      "rating": 4,
      "date": "3 months ago",
      "title": "Very high quality formulation and beautiful engraving",
      "comment": "Everything from the magnetic closure feel, the laser engraving precision, to the longevity of crisp cedarwood makes this a 10/10 purchase.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-040",
      "author": "Siddharth Verma",
      "rating": 5,
      "date": "3 months ago",
      "title": "Unmatched performance in Indian weather",
      "comment": "Such a memorable fragrance profile. The crisp cedarwood note really shines in the evening air. Will definitely repurchase once my bottle runs low.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-041",
      "author": "Neha Singhania",
      "rating": 5,
      "date": "4 months ago",
      "title": "Absolute Masterpiece! Unbelievable Sillage",
      "comment": "I have been wearing Woo-Dy for special evenings and the compliments haven't stopped. The dry down notes of crisp cedarwood and aromatic cypress linger effortlessly for over 14 hours! The custom laser engraving on the 50ml bottle gives it such a personal royal touch.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-042",
      "author": "Ananya Roy",
      "rating": 5,
      "date": "5 months ago",
      "title": "Pure Luxury in a Bottle",
      "comment": "The opening with crisp cedarwood is so crisp and invigorating, transitioning smoothly into creamy sandalwood and earthy vetiver. Housed in a gorgeous heavy-glass bottle. Best luxury fragrance purchase of the year.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-043",
      "author": "Kunal Grover",
      "rating": 4,
      "date": "Yesterday",
      "title": "Very high quality formulation and beautiful engraving",
      "comment": "Unisex perfection. Extremely well blended with zero harsh synthetic notes. You can immediately tell this is a real 35%+ extrait de parfum. Woo-Dy has become an instant staple on my vanity.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-044",
      "author": "Varun Chauhan",
      "rating": 5,
      "date": "2 days ago",
      "title": "10/10 Longevity & Incredible Compliments",
      "comment": "I sprayed this on my blazer before a dinner party and 24 hours later I can still smell the intoxicating crisp cedarwood and resinous golden amber notes. The projection is polite yet unforgettable.",
      "verified": true
    },
    {
      "id": "rev-woo-dy-045",
      "author": "Natasha Khurana",
      "rating": 5,
      "date": "3 days ago",
      "title": "The Bottle & Laser Engraving is Stunner!",
      "comment": "Ordered the 50ml with custom photo engraving for our anniversary. The craftsmanship on the bottle is immaculate and the scent itself smells like a \u20b925,000 niche French perfume!",
      "verified": true
    },
    {
      "id": "rev-woo-dy-046",
      "author": "Ishaan Malhotra",
      "rating": 5,
      "date": "4 days ago",
      "title": "Extrait Concentration at its absolute finest",
      "comment": "Blind bought Woo-Dy after reading about the notes (crisp cedarwood, aromatic cypress, and creamy sandalwood). It exceeded all my expectations! Highly recommend for anyone looking for meditative sandalwood peace.",
      "verified": true
    }
  ]
};

/**
 * Returns verified customer reviews for a given perfume ID.
 */
export function getPerfumeReviews(productId: string): Review[] {
  return PERFUME_REVIEWS[productId] || [];
}

/**
 * Calculates review statistics (count, average rating, 5/4-star breakdown) for a perfume.
 */
export function getPerfumeReviewStats(productId: string, customReviews: Review[] = []): PerfumeReviewStats {
  const allRevs = [...customReviews, ...(PERFUME_REVIEWS[productId] || [])];
  
  if (allRevs.length === 0) {
    return {
      count: 0,
      averageRating: 5.0,
      ratingBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    };
  }

  const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let totalRating = 0;

  for (const r of allRevs) {
    const star = Math.max(1, Math.min(5, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5;
    breakdown[star] = (breakdown[star] || 0) + 1;
    totalRating += r.rating;
  }

  const averageRating = Number((totalRating / allRevs.length).toFixed(2));

  return {
    count: allRevs.length,
    averageRating,
    ratingBreakdown: breakdown
  };
}
