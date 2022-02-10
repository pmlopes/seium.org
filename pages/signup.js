import { useState } from "react";

import { withoutAuth } from "/components/Auth";
import Fade from "react-reveal/Fade";

import Button from "/components/utils/Button";
import Card from "/components/utils/Card";

import Return from "/components/moonstone/utils/Return";
import Form from "/components/moonstone/utils/Form";
import Input from "/components/moonstone/utils/Input";

import Title from "/components/moonstone/authentication/Title";
import Text from "/components/moonstone/authentication/Text";

function Signup() {

  const [name, updateName] = useState("");
  const [email, updateEmail] = useState("");
  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");
  const [passwordConf, updatePasswordConf] = useState("");

  const onFinish = e => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen overflow-hidden bg-secondary">
      <Return componentStyle="sm:ml-14 mt-10 sm:mt-20 mb-6" />
      <div className="flex flex-col items-center justify-center sm:mt-16">
        <Title text="Sign up" />

        <Form onSubmit={onFinish}>
          <Input
            text="NAME"
            id="name"
            name="name"
            fgColor="white"
            bgColor="primary"
            onChange={e => updateName(e.currentTarget.value)}
          />
          <Input
            text="EMAIL"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            fgColor="white"
            bgColor="primary"
            onChange={e => updateEmail(e.currentTarget.value)}
          />
          <Input
            text="USERNAME"
            id="username"
            name="username"
            fgColor="white"
            bgColor="primary"
            onChange={e => updateUsername(e.currentTarget.value)}
          />
          <Input
            text="PASSWORD"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            fgColor="white"
            bgColor="primary"
            onChange={e => updatePassword(e.currentTarget.value)}
          />
          <Input
            text="CONFIRM PASSWORD"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            fgColor="white"
            bgColor="primary"
            onChange={e => updatePasswordConf(e.currentTarget.value)}
          />
          <Button
            type="submit"
            text="LET'S GO"
            customStyle="text-secondary bg-quinary border-quinary"
          />
        </Form>
        <Text text="Already have an account?" link="Login here" href="/login" />
        <div className="absolute bottom-0 right-60 hidden lg:block">
          <Fade bottom>
            <Card
              img="/images/mascot-footer.svg"
              alt="MascotFooter"
              inverted={false}
            >
              Very restricted area. You just need to fill the form.
            </Card>
          </Fade>
        </div>
      </div>
    </div>
  );
}

export default withoutAuth(Signup);
