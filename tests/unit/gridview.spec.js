import { shallowMount } from "@vue/test-utils";
import GridView from "@/components/GridView.vue";

describe("GridView.vue", () => {
  it("renders grid view with class", () => {
    const wrapper = shallowMount(GridView);
    expect(wrapper.classes()).toContain("grid");
  });
});
