import React, { forwardRef } from "react";
import { Dialog, Flex, Button } from "@radix-ui/themes";

const TermsAndConditions = ({ open, onOpenChange }) => {
  return (
    <Dialog.Content size={"2"} style={{ width: "750px" }}>
      <Dialog.Title>Terms and Conditions</Dialog.Title>
      <Dialog.Description>{Terms}</Dialog.Description>
      <Flex gap="3" mt="4" justify="end">
        <Dialog.Close>
          <Button>Close</Button>
        </Dialog.Close>
      </Flex>
    </Dialog.Content>
  );
};
const Terms = (
  <div>
    <h2>
      <strong>1. Acceptance of Terms </strong>
    </h2>
    <p>
      By creating an account and using <strong>[Platform Name]</strong>, you
      acknowledge that you have read, understood, and agree to be bound by these
      Terms and Conditions. If you do not agree, you must discontinue use of the
      platform immediately.
    </p>
    <br></br>
    <h2>
      <strong>2. Community Conduct</strong>
    </h2>
    <p>
      As a user of <strong>[Platform Name]</strong>, you agree to:
    </p>
    <ul>
      <li>Maintain respectful and civil interactions with all users.</li>
      <li>
        Not engage in bullying, harassment, or targeted attacks against any
        individual or group.
      </li>
      <li>Not use vulgar, obscene, or offensive language.</li>
      <li>Not post racist, discriminatory, or hateful content in any form.</li>
      <li>
        Not use the platform to promote political agendas, campaigns, or
        propaganda.
      </li>
      <li>Not engage in hate speech or incite violence in any manner.</li>
      <li>
        Not impersonate others or engage in deceptive or misleading behavior.
      </li>
    </ul>

    <br></br>
    <h2>
      <strong>3. Content Ownership and Responsibility</strong>
    </h2>
    <ul>
      <li>
        You retain ownership of any original content you post but grant{" "}
        <strong>[Platform Name]</strong> a non-exclusive, worldwide,
        royalty-free license to display, distribute, and promote your content
        within the platform.
      </li>
      <li>
        You are solely responsible for the content you share and any
        consequences that may arise from it.
      </li>
      <li>
        <strong>[Platform Name]</strong> reserves the right to remove any
        content that violates these terms without prior notice.
      </li>
    </ul>

    <br></br>
    <h2>
      <strong>4. Account Management and Termination</strong>
    </h2>
    <ul>
      <li>
        <strong>[Platform Name]</strong> reserves the right to suspend or delete
        any account at its sole discretion if it determines that the user has
        violated these Terms and Conditions.
      </li>
      <li>
        Users may request to delete their accounts at any time, and we will
        process the request in accordance with our data retention policies.
      </li>
    </ul>

    <br></br>
    <h2>
      <strong>5. Prohibited Activities</strong>
    </h2>
    <ul>
      <li>Spamming, phishing, or spreading malicious software.</li>
      <li>Advertising or promoting unauthorized third-party services.</li>
      <li>
        Attempting to exploit platform vulnerabilities or engage in hacking
        activities.
      </li>
      <li>
        Using automated bots or scripts to manipulate engagement or content
        visibility.
      </li>
      <li>
        Sharing personal or sensitive information of others without their
        consent.
      </li>
    </ul>

    <br></br>
    <h2>
      <strong>6. Privacy and Data Protection</strong>
    </h2>
    <p>
      <strong>[Platform Name]</strong> values user privacy and follows best
      practices to protect personal data. By using this platform, you consent to
      our collection and use of personal data as outlined in our Privacy Policy.
    </p>

    <br></br>
    <h2>
      <strong>7. Changes to Terms</strong>
    </h2>
    <p>
      <strong>[Platform Name]</strong> reserves the right to update or modify
      these Terms and Conditions at any time. Continued use of the platform
      constitutes acceptance of any revisions.
    </p>

    <br></br>
    <h2>
      <strong>8. Disclaimer and Liability</strong>
    </h2>
    <ul>
      <li>
        <strong>[Platform Name]</strong> is not responsible for user-generated
        content and does not endorse opinions expressed by users.
      </li>
      <li>
        We provide the platform "as is" and disclaim all warranties, express or
        implied, regarding uninterrupted service or content accuracy.
      </li>
    </ul>

    <br></br>
    <h2>
      <strong>9. Contact Us</strong>
    </h2>
    <p>
      For questions or concerns regarding these Terms and Conditions, please
      contact us at <strong>[Insert Contact Email]</strong>.
    </p>

    <br></br>
    <p>
      By signing up and using <strong>[Platform Name]</strong>, you confirm that
      you have read, understood, and agree to these Terms and Conditions.
    </p>
  </div>
);

export default TermsAndConditions;
