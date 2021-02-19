import { render, getByTestId,} from "@testing-library/react";
import Footer from "../components/footer/Footer";

test("render Footer correctly",()=>{
   const {container} = render(<Footer />);
   const text = getByTestId(container,"footer-text")
   expect(text.textContent).toBe("©2022 Albicja The Future of the web🚀")
})  