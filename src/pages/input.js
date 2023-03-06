import React, { useState } from "react";
import Input from "@/components/input";

const questions = [
  {
    prompt: "What was the person's full name?",
    answer: "unanswered",
    type: "text",
  },
  {
    prompt: "What was their age at the time of death?",
    answer: "unanswered",
    type: "number",
  },
  {
    prompt: "What was the cause of Death?",
    answer: "unanswered",
    type: "text",
  },
  {
    prompt: "What was their occupation or profession?",
    answer: "unanswered",
    type: "text",
  },
  {
    prompt: "Where were they born and raised?",
    answer: "unanswered",
    type: "text",
  },
  {
    prompt: "Where did they live during their adult life?",
    answer: "unanswered",
    type: "text",
  },
  {
    prompt: "What were their hobbies or interests?",
    answer: "unanswered",
    type: "textarea",
  },
  {
    prompt: "What were some of their achievements or notable accomplishments?",
    answer: "unanswered",
    type: "textarea",
  },
  {
    prompt: "Who were their close family members and loved ones?",
    answer: "unanswered",
    type: "textarea",
  },
  {
    prompt:
      "What were some of their personality traits or values that they were known for?",
    answer: "unanswered",
    type: "textarea",
  },
  {
    prompt:
      "What was their favorite quote, saying or piece of advice they often gave?",
    answer: "unanswered",
    type: "textarea",
  },
];
const InputPage = () => {
  var [slide, setSlide] = useState(0);
  var [value, setValue] = useState("");
  var [setup, setSetup] = useState(false);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className="h-screen flex justify-center items-center ">
      <div
        className={`w-full absolute ${
          setup ? "opacity-1" : "opacity-0"
        } duration-1000`}
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
              } else {
                setSlide((slide += 1));
              }
            }}
          />
        </div>
      </div>
      {setup == false && (
        <div
          className={`w-full absolute ${
            setup == false ? "opacity-1" : "opacity-0"
          } duration-1000`}
        >
          <div className="max-w-5xl mx-auto justify-center flex px-5">
            <h1 className="text-4xl font-bold text-gray-50"></h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputPage;
