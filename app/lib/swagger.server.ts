// app/lib/swagger.server.ts

export interface GoogleReview {
    review_id: string;
    author: string;
    title: string;
    text: string;
    rating: string | number;
    date_added: string;
}
  
export interface SwaggerReviewResponse {
    trust_shops_total_review: {
        total_review: number;
        percentage: string;
    };
    google_total_review: {
        total_review: number;
        percentage: string;
    };
    google_reviews: GoogleReview[];
}
  
// Server-side fetch function
export async function fetchGoogleReviews(): Promise<SwaggerReviewResponse> {
    const API_URL = 'https://erp.abelini.com/shopify/api/google_review.php';
    const API_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3NDgzNDMzMTYsImlzcyI6Imh0dHBzOi8vZXJwLmFiZWxpbmkuY29tLyJ9.jMDU762J-JX7Y5AA3mxeFYFu8xtaBCInpqnwirrNYpo';
  
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${API_TOKEN}`,
        },
    });
  
    if (!res.ok) {
        throw new Error(`Failed to fetch reviews: ${res.status} ${res.statusText}`);
    }
  
    // Type assertion here
    const data = (await res.json()) as SwaggerReviewResponse;
  
    // Convert string numbers to actual numbers if needed
    data.trust_shops_total_review.total_review = Number(data.trust_shops_total_review.total_review);
    data.google_total_review.total_review = Number(data.google_total_review.total_review);
  
    data.google_reviews = data.google_reviews.map((review) => ({
        ...review,
        rating: Number(review.rating),
    }));
  
    return data;
}