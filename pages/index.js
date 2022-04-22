import { Fragment, useState, useEffect, useRef, createRef } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { Formik, Form, Field, FieldArray } from 'formik';

import QuestionOption from '../components/QuestionOption'

export default function Home() {

  const questions = [
    {
      id: '1',
      text: 'You\'re headed to the airport for an early morning flight. What are you wearing?',
      options: [
        {
          id: '11',
          text: "Sweat pants. Duh."
        },
        {
          id: '12',
          text: "Security lines be damned, I'm rocking boots."
        },
        {
          id: '13',
          text: "Workout clothes, just in case there's a yoga room somewhere."
        },
        {
          id: '14',
          text: "Same outfit I was wearing last night. Oops."
        },
        {
          id: '15',
          text: "Who cares, as long as it's comfortable."
        },
      ],
    },
    {
      id: '2',
      text: 'Settling in for a long flight, what movie would you choose?',
      options: [
        {
          id: '21',
          text: "A comedy"
        },
        {
          id: '22',
          text: "An action movie"
        },
        {
          id: '23',
          text: "A documentary"
        },
        {
          id: '24',
          text: "A historical drama"
        },
        {
          id: '25',
          text: "A musical"
        },
      ],
    },
    {
      id: '3',
      text: 'Which best describes your perfect first date?',
      options: [
        {
          id: '31',
          text: "A 5-course dinner"
        },
        {
          id: '32',
          text: "Hiking and smoothies"
        },
        {
          id: '33',
          text: "Cocktails and dancing"
        },
        {
          id: '34',
          text: "Catching a movie"
        },
        {
          id: '35',
          text: "Browsing an art show"
        },
      ],
    }
  ]
  const questionsLength = questions.length
  const lastQuestionIndex = questionsLength - 1

  const initialValues = {
    answers: questions.map(a => ({ questionId: a.id, answer: '' })),
  };

  const router = useRouter();

  const introRef = useRef(null);
  const sectionsRef = useRef(questions.map(() => createRef()));
  const formRef = useRef(null);

  useEffect( () => {
    const body = document.querySelector("body")
    body.classList.add("overflow-hidden")

    return function cleanup() {
      body.classList.remove("overflow-hidden")
    };
  });

  const [currentIndex, setCurrentIndex] = useState(-1);

  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToCurrent = () => {
    scrollToRef(sectionsRef.current[currentIndex])
  }

  const scrollToPrev = () => {
    if (currentIndex === 0) {
      setCurrentIndex(-1)

      return scrollToRef(introRef)
    }

    setCurrentIndex(--currentIndex)

    scrollToCurrent()
  }

  const scrollToNext = () => {
    const values = formRef.current.values
    const missedIndex = values.answers.findIndex(a => a.answer === '')

    if (missedIndex !== -1 && currentIndex === lastQuestionIndex) {
      setCurrentIndex(missedIndex)

      return scrollToRef(sectionsRef.current[missedIndex])
    } else if (missedIndex === -1) {
      return router.push('change_agent')
    }

    setCurrentIndex(++currentIndex)

    scrollToCurrent()
  }

  const handleChoose = async (setFieldValue, { name, value }) => {

    await setFieldValue(name, value)

    scrollToNext()
  }

  return (
    <div>
      <Head>
        <title>Airbnb Trip Matcher</title>
        <meta name="description" content="Airbnb Trip Matcher" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Formik
          innerRef={formRef}
          initialValues={initialValues}
        >
          {({ setFieldValue, values }) => (
            <Fragment>
              <div className={`slider-up hide-sm${ currentIndex === -1 ? ' hidden' : ''}`} onClick={() => scrollToPrev()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="14" viewBox="0 0 21 14">
                  <path fill="#B4A76C" fillRule="nonzero" d="M10.5 0L21 10.413 17.385 14 10.5 7.171 3.615 14 0 10.414z"></path>
                </svg>
              </div>

              <div
                className={`slider-down hide-sm${ currentIndex === -1 || currentIndex === lastQuestionIndex ? ' hidden' : ''}`}
                onClick={() => scrollToNext()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="14" viewBox="0 0 21 14"><path fill="#B4A76C" fillRule="nonzero" d="M10.5 14L0 3.587 3.615 0 10.5 6.829 17.385 0 21 3.586z"></path>
                </svg>
              </div>

              <section
                ref={introRef}
                className="intro-section"
              >
                <div className="content">
                  <Image src="/logo.png" alt="Vercel Logo" width={63} height={68} />

                  <h1>Airbnb Trip Matcher</h1>
                    <p className="text">Can’t decide where to roam this year? We’ve got you covered. Take our quiz to find out your Travel Personality – and we’ll take care of the rest.</p>
                    <p className="start-link" onClick={() => scrollToNext()}>Take the quiz!</p>
                    <div className="slider-down-relative" onClick={() => scrollToNext()}>
                    <div className="va-container va-container-v va-container-h">
                      <div className="va-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="14" viewBox="0 0 21 14">
                          <path fill="#B4A76C" fillRule="nonzero" d="M10.5 14L0 3.587 3.615 0 10.5 6.829 17.385 0 21 3.586z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <Form>
                <FieldArray name="answers">
                  {({ insert, remove, push }) => (
                    <Fragment>
                      {questionsLength > 0 &&
                        questions.map((question, index) => (
                          <section
                            ref={sectionsRef.current[index]}
                            key={question.id}
                            className="section"
                          >
                            <div className="row">
                              <div className="question col space-right-1">
                                <div className="question-numbering">Question {index+1}/{questionsLength}</div>
                                <div className="question-text">
                                  {question.text}
                                </div>
                              </div>
              
                              <div className="options col space-left-1">
                                <ul>
                                  {question.options.map(option => (
                                    <Field
                                      key={option.id}
                                      as={QuestionOption}
                                      choices={values.answers}
                                      name={`answers.${index}.answer`}
                                      label={option.text}
                                      value={option.id}
                                      onChange={(params) => handleChoose(setFieldValue, params)}
                                    />
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </section>
                        ))}
                    </Fragment>
                  )}
                </FieldArray>
              </Form>
            </Fragment>
          )}
        </Formik>
      </main>
    </div>
  )
}
