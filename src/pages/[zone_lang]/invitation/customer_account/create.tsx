import CreateAccount from "@PageContent/Customer/CreateAccount";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CreateAccountPage = () => {
  const [invitationToken, setInvitationToken] = useState();
  const router = useRouter();
  useEffect(() => {
    setInvitationToken(router.query.token);
  });
  return <CreateAccount isInvite token={invitationToken} />;
};

export default CreateAccountPage;
