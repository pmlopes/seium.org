import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { withoutAuth } from "/components/Auth";
import { useAuth } from "/components/Auth/useAuth"

import Fade from "react-reveal/Fade";
import Link from "next/link";

import Button from "/components/utils/Button";
import ImageButton from "/components/moonstone/utils/ImageButton";
import Card from "/components/utils/Card";

import Return from "/components/moonstone/utils/Return";
import Form from "/components/moonstone/utils/Form";
import Input from "/components/moonstone/utils/Input";

import Title from "/components/moonstone/authentication/Title";

function checkPasswordStrength(password) {
  return password.length >= 8;
}

export async function getServerSideProps({ query }) {
  if (query.token === undefined) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
}

function Reset() {

  const router = useRouter();
  const { token } = router.query;

  /*

    Null  -> No reset yet
    True  -> Reset successful
    False -> Reset failed

    */
  const [success, updateSuccess] = useState(null);
  const [password1, updatePassword1] = useState("");
  const [password2, updatePassword2] = useState("");
  const [errorMsg, updateErrorMsg] = useState("");
  const { errors, isLoading, resetPassword } = useAuth();

  function onSubmit(event) {
    event.preventDefault();

    if (password1 !== password2)
      updateErrorMsg("The passwords must match");
    else if (!checkPasswordStrength(password1))
      updateErrorMsg("Your password isn't strong enough. Try FAMILY");
    else {
      resetPassword({ token, password: password1 });
      updateSuccess(errors === null);
    }
  }

  return (
    <div className="min-h-screen overflow-hidden bg-secondary">
      <Return componentStyle="sm:ml-14 mt-10 sm:mt-20 mb-20" />
      <div className="flex flex-col items-center justify-center sm:mt-40">
        <Title text="Recover your password" />

        {success === null &&
          <Form onSubmit={onSubmit}>
            <Input
              text="PASSWORD"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              fgColor="white"
              bgColor="primary"
              onChange={(e) => updatePassword1(e.currentTarget.value)}
            />
            <Input
              text="CONFIRM PASSWORD"
              id="confirm"
              name="confirm"
              type="password"
              autoComplete="current-password"
              fgColor="white"
              bgColor="primary"
              onChange={(e) => updatePassword2(e.currentTarget.value)}
            />
            <p className="mt-10 mb-10 font-iregular text-red-700 text-center">
              {errorMsg}
            </p>
            <ImageButton
              type="submit"
              text="LET’S GO"
              customStyle="text-secondary bg-quinary border-quinary"
              imageSrc={isLoading ? "/images/loading.gif" : ""}
              imageAlt="HANG TIGHT..."
            />
          </Form>
        }

        {success === false &&
          <p className="mt-10 mb-10 font-iregular text-red-700 text-center">
            An error has occured. Please try again later
          </p>
        }

        {success === true &&
          <>
            <p className="mt-10 mb-10 font-iregular text-quinary">
              Password reset successfully
            </p>
            <div className="w-96">
              <Link href="/login" passHref>
                <a>
                  <Button
                    type=""
                    text="BACK TO MOONSTONE"
                    customStyle="text-secondary bg-quinary border-quinary"
                  />
                </a>
              </Link>
            </div>
          </>
        }

        <div className="absolute bottom-0 right-60 hidden lg:block">
          <Fade bottom>
            <Card
              img="/images/mascot-footer.svg"
              alt="MascotFooter"
              inverted={false}
            >
              Try not to forget your password
            </Card>
          </Fade>
        </div>
      </div>
    </div>
  );
}

export default withoutAuth(Reset);
