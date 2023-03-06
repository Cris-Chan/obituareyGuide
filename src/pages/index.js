import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import axios from "axios";
import Input from "@/components/input";

const questions = [
  {
    prompt: "What was the person's full name?",
    call: "name",
    answer: "unanswered",
    type: "text",
  },
  {
    prompt: "What was their age at the time of death?",
    call: "age",
    answer: "unanswered",
    type: "number",
  },
  {
    prompt: "What was the cause of Death?",
    call: "causeofdeath",
    answer: "unanswered",
    type: "text",
  },
  {
    prompt: "What was their occupation or profession?",
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
    prompt: "Where did they live during their adult life?",
    call: "adultHome",
    answer: "unanswered",
    type: "text",
  },
  {
    prompt: "What were their hobbies or interests?",
    call: "interests",
    answer: "unanswered",
    type: "textarea",
  },
  {
    prompt: "What were some of their achievements or notable accomplishments?",
    call: "accomplishments",
    answer: "unanswered",
    type: "textarea",
  },
  {
    prompt: "Who were their close family members and loved ones?",
    call: "lovedones",
    answer: "unanswered",
    type: "textarea",
  },
  {
    prompt:
      "What were some of their personality traits or values that they were known for?",
    call: "personality",
    answer: "unanswered",
    type: "textarea",
  },
  {
    prompt:
      "What was their favorite quote, saying or piece of advice they often gave?",
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
    }, 13000);
    setTimeout(() => {
      setFade(true);
    }, 14000);
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
            "Hey there im John!", // Types 'One'
            2000, // Waits 2s
            "An Ai assistant here to help you create a thoughtful obituary", // Deletes 'One' and types 'Two'
            1000, // Waits 1s
            "Lets get started!", // Types 'Three' without deleting 'Two'
            2500,
            () => {
              console.log("Done typing!"); // Place optional callbacks anywhere in the array
            },
          ]}
          wrapper="div"
          cursor={false}
          repeat={0}
          speed={50}
          deletionSpeed={80}
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
