import { useQuery } from "react-query";
import { isPast } from "date-fns";
import { useLocation } from "preact-iso";
import { fetchShowByTimestamp } from "../../utils/api";

import { Link } from "../../components/Link";
import { Button } from "../../components/Button";
import { Disclaimer } from "../../components/Disclaimer";
import { Section, Field, FieldWrapper } from "./Helpers";
import { ShowDetails } from "./ShowDetails";
import { LineUp, Show } from "../../types";

const howHeardOptions = [
  "Other",
  "Been There",
  "Citysearch.com",
  "Comedian",
  "Conan O'Brien",
  "E-mail",
  "Family/Friends",
  "Guide Book",
  "Host Brought Me In",
  "Hotel",
  "Howard Stern",
  "Internet",
  "Live In The Area",
  "Magazine",
  "New York Magazine",
  "Newspaper",
  "NYU",
  "Olive Tree",
  "Passed By",
  "Phone Book",
  "Radio Show",
  "Time Out",
  "TV Show",
  "Village Voice",
  "Word of Mouth",
  "Zagat",
];

const timestampRegex = /\b\d{10}\b/;

export default function Reservation(props: { timestamp: string }) {
  const location = useLocation();
  const timestamp = props.timestamp;

  if (
    !timestamp ||
    timestampRegex.test(timestamp) === false ||
    isPast(+timestamp * 1000)
  ) {
    location.route("/404");
  }

  const showData = useQuery<{ show: Show; lineUp?: LineUp }>(
    ["timestamp", timestamp],
    async () => {
      const showData = await fetchShowByTimestamp({ timestamp });

      return showData;
    }
  );

  const handleSubmit = (event: Event) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };

  if (showData.isLoading) {
    return <div>Loading...</div>;
  }

  if (showData.isError) {
    return <div>Error: {showData.error}</div>;
  }

  if (!showData.data) {
    return <div>No data</div>;
  }

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 space-x-5">
            <div className="col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-4">
              <h3></h3>
              <Section title="Reservation Information" description="">
                <FieldWrapper>
                  <Field label="firstName" labelText={"First Name"}>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </Field>

                  <Field label="lastName" labelText={"Last Name"}>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </Field>

                  <Field label="size" labelText="Party Size (max 4)">
                    <input
                      type="number"
                      name="size"
                      id="size"
                      max={4}
                      min={1}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </Field>
                </FieldWrapper>
              </Section>

              <Section
                title="Contact Information"
                description="You'll receive your reservation confirmation here"
              >
                <FieldWrapper>
                  <Field label="email" labelText={"Email Address"}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </Field>

                  <Field
                    label="emailConfirm"
                    labelText={"Confirm Email Address"}
                  >
                    <input
                      id="emailConfirm"
                      name="emailConfirm"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </Field>

                  <Field label="phone" labelText="Phone Number">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </Field>
                </FieldWrapper>
              </Section>

              <Section title="Misc">
                <FieldWrapper>
                  <Field
                    label="howHeard"
                    labelText="How did you hear about us?
"
                  >
                    <select
                      id="howHeard"
                      name="howHeard"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      {howHeardOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </Field>

                  <div className="space-y-5">
                    <div className="relative flex items-start">
                      <div className="flex h-6 items-center">
                        <input
                          id="smsOk"
                          aria-describedby="smsOk-description"
                          name="smsOk"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="ml-3 text-sm leading-6">
                        <label
                          htmlFor="smsOk"
                          className="font-medium text-gray-900"
                        >
                          One time SMS feedback
                        </label>
                        <p id="comments-description" className="text-gray-500">
                          After the show, can the cellar text you a request for
                          your comments? The number will never be used again
                          after.
                        </p>
                      </div>
                    </div>
                  </div>
                </FieldWrapper>
              </Section>
            </div>
            <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-2 space-y-5">
              <ShowDetails
                show={showData.data.show}
                lineUp={showData.data.lineUp}
              />
              <hr />
              <Disclaimer />
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between gap-x-6">
            <Button type="submit" className="bg-primary" onClick={() => null}>
              Submit
            </Button>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={showData.data.show.reservationUrl}
            >
              Reserve on comedycellar.com
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
