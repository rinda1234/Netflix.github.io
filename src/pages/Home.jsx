import Header from "../components/Header";

export default function Home() {
    return (
        <>
            <Header />
            <main style={{ padding: "24px", color: "#fff" }}>
                <h2>Home</h2>
                <p>로그인 성공 🎉</p>
            </main>
        </>
    );
}
