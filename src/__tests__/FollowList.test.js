import FollowList from "../components/user/ProfilBody/ProfilInfos/FollowList";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Link } from "react-router-dom";
import routeData from "react-router";

const mockLocation = {
  pathname: "/user/test",
  hash: "",
  search: "",
  state: "",
};

const followersList = [
  {
    avatarUrl: "a",
    nick: "a",
  },
  {
    avatarUrl: "b",
    nick: "b",
  },
];

Enzyme.configure({ adapter: new Adapter() });

describe("<FollowList>", () => {
  let wrapper;
  beforeEach(() => {
    jest.spyOn(routeData, "useParams").mockReturnValue(mockLocation);
    wrapper = shallow(
      <FollowList title="test" slug="test" list={followersList} />
    );
  });

  it("should render heading text", () => {
    expect(wrapper.find("h4").text()).toBe("test");
  });

  it("should have length 2", () => {
    expect(wrapper.find('div')).toHaveLength(3);
  });
});
