import axios from "axios";

export default async (req, res) => {
  try {
    const response = await axios.post(
      "https://us-central1-obituary-gpt.cloudfunctions.net/app/find-complexity",
      req.body
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.response ? error.response.data : "Theres an issue my guy",
    });
  }
};
