import React from "react";
import { render, getByTestId, fireEvent } from "@testing-library/react";
import NavbarSearch from "../components/navbar/NavbarSearch";
import NavbarLogo from "../components/navbar/NavbarLogo";
import Enzyme,{shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Link } from "react-router-dom";

Enzyme.configure({ adapter: new Adapter() });

test("render navbar search correctly", () => {
  const { container } = render(<NavbarSearch />);
  const form = getByTestId(container, "searchform");
  const btn = getByTestId(container, "form-search-btn");
  const input = getByTestId(container, "search-input");

  expect(form).toBeTruthy();
  expect(btn).toBeTruthy();
  expect(input).toBeTruthy();
});

test("navbar logo render correctly",()=>{
    const wrapper = shallow(<NavbarLogo/>)
    expect(wrapper.find("div")).toBeTruthy()
})

describe("navbarlogo",()=>{
    it("should render link",()=>{
        const wrapper = shallow(<NavbarLogo/>)
        const logowrapper = wrapper.find("div")
        expect(logowrapper).toBeTruthy()
        expect(wrapper.contains(<Link to="/" className="text-light logo">
        ALBICJA
      </Link>)).toBeTruthy()
    })
})

describe("NavbarSearch", () => {
  it("inputchange", () => {
    const { container } = render(<NavbarSearch />);
    const input = getByTestId(container, "search-input");
    fireEvent.change(input, { target: { value: "test" } });
    expect(input.value).toBe("test");
  });
});
