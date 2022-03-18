import NavLandPage from "../components/NavLandPage";
import ContactForm from "../components/ContactForm";
import Staff from "../components/Staff";
import Headline from "../components/Headline";
import "../css/landPage.css"

function LandPage() {
    document.body.classList.add("text-sm-center", "text-md-start", "d-flex", "h-100", "text-black", "bg-light");
    document.getElementById('root').classList.add("d-flex", "w-100", "h-100", "mx-0", "flex-column");

    return (
        <>
            <NavLandPage />
            <main className="d-flex flex-column">
                <Headline />
                <Staff />
                <ContactForm />
            </main>
            <footer className="footer-land-page mt-auto py-3 text-white-50 text-center">
                <p className="my-0">
                    Cover template by &nbsp;
                    <a className="text-white" href="https://twitter.com/jodidoda">@jodidogato</a>
                    .
                </p>
            </footer>
                       
        </>
    );
}

export default LandPage;
