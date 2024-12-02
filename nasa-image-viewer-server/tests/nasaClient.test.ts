import axios from "axios";
import path from "path";
import { fetchMarsPhotos, downloadImage } from "../src/nasaClient";

jest.mock("axios");

describe("Fetch Mars Rover Photos", () => {
  it("should fetch images successfully", async () => {
    const mockResponse = {
      data: {
        photos: [{ img_src: "http://example.com/photo1.jpg" }],
      },
    };

    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const images = await fetchMarsPhotos("2021-08-01");
    expect(images).toEqual(["http://example.com/photo1.jpg"]);
  });
});
