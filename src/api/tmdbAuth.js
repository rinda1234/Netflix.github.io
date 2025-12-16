import tmdb from "./tmdb";

// TMDB API를 이용한 "가짜 해시" 생성
export async function hashPassword(password) {
    const res = await tmdb.get("/configuration");

    // 응답에서 안전한 값 하나 사용
    const baseUrl = res.data.images.base_url;

    // 단순 가공 (보안 목적 ❌, 과제 목적 ⭕)
    return btoa(password + baseUrl);
}
