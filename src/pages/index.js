import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import axios from "axios";
import Input from "@/components/input";

const questions = [
  {
    prompt: "Can you tell me the name of your loved one?",
    call: "name",
    answer: "unanswered",
    type: "text",
  },
  {
    prompt: "Can you share their age with me?",
    call: "age",
    answer: "unanswered",
    type: "number",
  },
  {
    prompt:
      "What were some of the things that your loved one was passionate about?",
    call: "interests",
    answer: "unanswered",
    type: "textarea",
  },
  {
    prompt: "Tell me little bit about their occupation or profession?",
    call: "profession",
    answer: "unanswered",
    type: "text",
  },
  {
    prompt: "Where were they born and raised?",
    call: "birthplace",
    answer: "unanswered",
    type: "text",
  },
  {
    prompt:
      "What were some of the places they lived and went during their life?",
    call: "adultHome",
    answer: "unanswered",
    type: "text",
  },
  {
    prompt: "What were some of the things that they enjoyed doing?",
    call: "interests",
    answer: "unanswered",
    type: "textarea",
  },
  {
    prompt: "Tell me about some of their notable achievements?",
    call: "accomplishments",
    answer: "unanswered",
    type: "textarea",
  },
  {
    prompt: "Who were some of the people they were closest to?",
    call: "lovedones",
    answer: "unanswered",
    type: "textarea",
  },
  {
    prompt:
      "Can you share some of their personality traits or values that they were known for?",
    call: "personality",
    answer: "unanswered",
    type: "textarea",
  },
  {
    prompt:
      "What was their favorite quote, saying, or piece of advice that they often shared?",
    call: "sayings",
    answer: "unanswered",
    type: "textarea",
  },
];

const Landing = () => {
  const [isVisable, setVisable] = useState(true);
  var [slide, setSlide] = useState(0);
  var [value, setValue] = useState("");
  var [setup, setSetup] = useState(false);
  var [fade, setFade] = useState(false);
  var [generating, setGenerating] = useState(false);
  var [obituary, setObituary] = useState(null);
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    const answers = {};
    questions.forEach((question) => {
      answers[question.call] = question.answer;
    });
    console.log(JSON.stringify(answers));
    try {
      const response = await axios
        .post("/api/obituary", answers)
        .then(function (response) {
          setGenerating(false);
          console.log(response.data);
          setObituary(response.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      console.log("AHHH");
      setVisable(false);
      setSetup(true);
    }, 30000);
    setTimeout(() => {
      setFade(true);
    }, 32000);
  }, []);

  return (
    <div className="h-screen flex justify-center items-center">
      <div
        className={
          "max-w-2xl absolute " +
          (!isVisable ? "opacity-0 transition duration-700 ease-in-out" : "")
        }
      >
        <TypeAnimation
          sequence={[
            "Hello, I'm John, an Ai here to help you create a meaningful and thoughtful obituary for your loved one.", // Types the first sentence
            3000, // Waits for 3s
            "Together, we can create an obituary that honors your loved one's memory and celebrates their life and accomplishments.", // Types the third sentence
            4000, // Waits for 5s
            "Let's begin by answering a few questions about your loved one.", // Types the fourth sentence
            8000, // Waits for 10s
            () => {
              console.log("Done typing!"); // Optional callback
            },
          ]}
          wrapper="div"
          cursor={false}
          repeat={0}
          speed={50}
          deletionSpeed={85}
          className={"text-5xl font-bold text-center text-gray-50"}
        />
      </div>
      {setup && (
        <div
          className={`w-full absolute ${
            fade
              ? "opacity-1 transition duration-1000 ease-in-out"
              : "opacity-0 transition duration-1000 ease-in-out"
          }`}
        >
          <div className="max-w-5xl mx-auto justify-center flex px-5">
            <Input
              type={questions[slide].type}
              value={value}
              prompt={questions[slide].prompt}
              onChange={handleChange}
              onClick={(e) => {
                questions[slide].answer = value;
                setValue("");
                if (slide + 1 == questions.length) {
                  setSetup(false);
                  setGenerating(true);
                  handleSubmit();
                } else {
                  setSlide((slide += 1));
                }
              }}
            />
          </div>
        </div>
      )}
      {setup === false && isVisable === false && generating == true && (
        <div
          className={`w-full absolute flex justify-center items-center ${
            setup == false ? "opacity-1" : "opacity-0"
          } duration-1000`}
        >
          <div
            className={
              "max-w-2xl absolute flex justify-center items-center " +
              (!generating
                ? "opacity-0 transition duration-700 ease-in-out"
                : "")
            }
          >
            <TypeAnimation
              sequence={[
                "generating",
                1000,
                "generating.",
                1000,
                "generating..",
                1000,
                "generating...",
                1000,
                "generating",
                1000,
                "generating.",
                1000,
                "generating..",
                1000,
                "generating...",
                1000,
                "generating",
                1000,
                "generating.",
                1000,
                "generating..",
                1000,
                "generating...",
                () => {
                  console.log("Done typing!");
                },
              ]}
              wrapper="div"
              cursor={false}
              repeat={0}
              speed={50}
              deletionSpeed={80}
              className="text-5xl font-bold text-center text-gray-50"
            />
          </div>
        </div>
      )}
      {obituary && (
        <div className="flex justify-center items-center h-screen">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-center text-gray-50 mb-4">
              Generated Obituary
            </h2>
            <p className="text-xl font-bold text-center text-gray-50 mb-4">
              {obituary.data}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
