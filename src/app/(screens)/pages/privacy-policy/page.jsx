import { Container, Link, Typography } from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Privacy Policy
      </Typography>

      <Typography variant="body1" paragraph>
        D & M REVOLUTIONS PTY LTD (“us,” “we,” or “our”) operates the Majik Gift
        websites and mobile applications (the “Service”). We respect our users’
        privacy. Please take a moment to familiarize yourself with our privacy
        practices and let us know if you have any questions.
      </Typography>

      <Typography variant="body1" paragraph>
        This Privacy Policy (“Policy”) explains our policies regarding the
        collection, storage, use, transfer, and disclosure of Personal
        Information when you use our Service. The Policy does not address our
        collection of Personal Information from other sources. The Policy
        applies to you if you are a user, Advisor, or other visitor to our
        website and/or Service.
      </Typography>

      <Typography variant="body1" paragraph>
        The Personal Information you provide us will be used to provide and
        improve the Service. By using the Service, you agree to our collection
        and use of information in accordance with this Policy. Unless otherwise
        defined in this Policy, the terms used here have the same meanings as in
        our Terms of Use.
      </Typography>

      <Typography variant="body1" paragraph>
        This privacy policy has been updated to comply with the EU and UK
        General Data Protection Regulation (GDPR).
      </Typography>

      <Typography variant="body1" paragraph>
        It is your responsibility to read this Policy. If you do not accept this
        Policy, you must not use the Service.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Information Collection and Use
      </Typography>

      <Typography variant="body1" paragraph>
        While using our Service, we may ask you to provide us with certain
        personally identifiable information that can be used to purchase the
        Service and to contact or identify you. Personally identifiable
        information may include, but is not limited to, your email address,
        name, phone number, postal address, Stripe and Zoom (“Personal
        Information”). If you are using the Service as an Advisor, you may be
        required to provide additional information, including, but not limited
        to, photo identification or other identity-verifying information and tax
        related documents, such as a ABN, Form W- 9 or Form W-8BEN, that will be
        maintained in our databases. Even though you may provide us with credit
        card or other financial information, we do not handle, process, or store
        that information. Payment for our Service is processed through a
        carefully selected third party, such as Stripe. Personal Information
        shared with third party payment services will be used only in accordance
        with the terms of the third-party services. We retain sole discretion to
        choose another third-party payment service.
      </Typography>

      <Typography variant="body1" paragraph>
        You understand that you are providing us with this information
        voluntarily and it may be shared with third parties in accordance with
        this Policy. Your Personal Information may also be used to send you
        updates regarding our company, to respond to your requests for
        information or customer service, or to inform you of other services or
        benefits that you may be interested in..
      </Typography>

      <Typography variant="body1" paragraph>
        The following is a list of Personal Information collected by D & M
        REVOLUTIONS PTY LTD – MAJIK GIFT:
      </Typography>

      <Typography variant="body1" paragraph component="div">
        <ul>
          {dataPoints.map((dataPoint, index) => (
            <li
              style={{
                listStyleType: "circle",
                listStylePosition: "inside",
              }}
              key={index}
            >
              {dataPoint}
            </li>
          ))}
        </ul>
      </Typography>

      <Typography variant="body1" paragraph>
        This information will be stored on third party partner servers (e.g.
        Stripe Web Services). User data is hosted on servers belonging to third
        parties with whom we have signed Data Processing Agreements. All
        third-party partners are GDPR-compliant.. Our primary purpose in
        collecting Personal Information about you in connection with your use of
        our Services is to provide you or connect you with products, services,
        information, Advisors and users that match your interests and
        preferences. However, we may use such information collected about you
        for a variety of commercial purposes. Without limitation, we may use
        such information to
      </Typography>

      <Typography variant="body1" paragraph component="div">
        <ul>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            Enable your participation in activities on our Services
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            Provide our offerings and services to you
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            Confirm your identity
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            Enforce our Service policies and terms of service, and investigate
            potential violations of such policies or terms
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            Fulfill an order that you place through any of our Services,
            including to process payment for any purchase made through any of
            our Services
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            Respond to inquiries that you may have about any of our Services
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            Administer your account on any of our Services
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            Display content based upon your interests
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            Enable you to search information on our Services
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            List in our search and directory services any users who provide
            services through one of our Services
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            Contact you regarding customer service and customer surveys
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            Assess your needs and interests in order to better tailor offers
            and/or advertising
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            Improve our Services or develop new tools, features, products, and
            services
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            Inform you of changes made to our Services
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            Organize or carry out promotional activities, games, or promotional
            events
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            Inform you of products, services, promotions, offers, and
            competitions which you may find interesting, provided you have not
            opted out of receiving such information or, where required, we have
            your express consent
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            Conduct research
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            Understand general customer trends and patterns so we can develop
            and support existing and ongoing marketing strategies for our
            products and services
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            Conduct other marketing and commercial activities
          </li>
        </ul>
      </Typography>
      <Typography variant="body1" paragraph>
        We may also use information about you that we collect in connection with
        your use of our Services for security, administrative, and legal
        purposes (including to detect, prevent, or otherwise address fraud,
        security or technical issues).
      </Typography>

      <Typography variant="body1" paragraph>
        All communications on Majik Gift are stored and are used for purposes
        outlined in this Policy.
      </Typography>

      <Typography variant="body1" paragraph>
        We may also anonymize your information to remove Personal Information so
        that it cannot be associated with you or any other individual. We may
        analyse and use anonymized data to conduct research and develop new
        tools, features, products or services. We may also safely share
        anonymized data with third parties including our affiliates.
      </Typography>

      <Typography variant="body1" paragraph>
        For users located in Australia the U.S. (excluding the Commonwealth of
        Virginia and the States of Colorado and Connecticut), we may use your
        Personal Information for the purposes of training artificial
        intelligence (AI) models. For example, when you chat with Advisors or
        other users via our Service, we may use these conversations to develop
        new products, services, and tools utilizing AI. We will not use Personal
        Information of users located in the EU, UK, Virginia, Colorado,
        Connecticut or any jurisdiction in which such use is not permitted under
        applicable law for these purposes
      </Typography>

      <Typography variant="h5" gutterBottom>
        RIGHTS UNDER GDPR
      </Typography>

      <Typography variant="body1" paragraph>
        Under certain circumstances, users based in the EU and UK have rights
        under data protection laws in relation to your personal data, namely:
      </Typography>
      <Typography variant="body1" paragraph component="div">
        <ul>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            Access, correction, update, or erasure of your data: You may have
            the right to request access, correction, update, or erasure in
            regards to any personal data we hold about you. We will consider
            your request in accordance with applicable laws.
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            Restriction of processing your personal data. You may have the right
            to prevent or restrict processing of your personal data
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            Portability of your personal data. You may have the right to request
            transfer of your personal data to a third party, when technically
            feasible.
          </li>
        </ul>
      </Typography>
      <Typography variant="body1" paragraph>
        You can exercise any of these rights by emailing us at{" "}
        <Link href="mailto:info@majikgift.com">info@majikgift.com</Link>
      </Typography>

      <Typography variant="h5" gutterBottom>
        ADDITIONAL INFORMATION FOR CALIFORNIA RESIDENTS
      </Typography>

      <Typography variant="body1" paragraph>
        This section contains information about policies that apply solely to
        California residents who use Site and/or Services. If you are a
        California resident, as of January 2020 you have certain rights
        regarding your Personal Information under the California Consumer
        Privacy Act of 2018 (“CCPA”):
      </Typography>
      <Typography variant="h5" gutterBottom>
        Right to Know About Personal Information Collected, Disclosed, or Sold
      </Typography>
      <Typography variant="body1" paragraph>
        You may request that we provide you with the following information:
      </Typography>

      <Typography variant="body1" paragraph>
        <ul>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            The categories or specific pieces of Personal Information that we
            have collected about you.
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            The categories of sources from which the Personal Information was
            collected.
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            The purposes for collecting, using, or selling that Personal
            Information. Please note that we do not sell Personal Information
            (as we understand the term "sell" to be defined in the CCPA).
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            The categories of third parties with whom we shared that Personal
            Information.
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            The categories of Personal Information we have disclosed or sold for
            a business purpose.
          </li>
        </ul>
      </Typography>

      <Typography variant="body1" paragraph>
        Details about the Personal Information we collect can be found in the
        “Information Collection and Use” section of this Policy. Further,
        details about the Personal Information that we disclose to third-parties
        for business purposes can be found in the “Information Sharing and
        Disclosure” section of this Policy. The supplemental policy for the CCPA
        regarding the Personal Information we have collected over the last 12
        months, including the categories of Personal Information, business
        purposes, and whether we collect or sell your Personal Information are
        provided below:
        <br />
        <br />
        Sources of Your Personal Information
        <br />
        <br />
        The Personal Information we collect is obtained from the following
        sources:
      </Typography>

      <Typography variant="body1" paragraph>
        <ul>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            Directly from you. For example, from forms you complete in our app
            or website, advisor applications, or the purchase of products.
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            Indirectly from you. For example, through your interactions on our
            apps or websites.
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            From our affiliates. For example, when you use the services of one
            of our affiliates (as discussed in the Information Sharing and
            Disclosure section of this Policy).
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            From third parties. For example, third-party social networking
            providers, analytics services, and advertising companies. If you do
            not want us to collect information from such third parties, you
            should review and adjust your privacy settings on those networks
            accordingly. To assist you in doing this, we have provided links to
            opt out of these third parties below:
            <ul>
              <li
                style={{
                  listStyleType: "-moz-initial",
                  listStylePosition: "inside",
                  marginLeft: "40px",
                }}
              >
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Analytics
                </a>
              </li>
              <li
                style={{
                  listStyleType: "-moz-initial",
                  listStylePosition: "inside",
                  marginLeft: "40px",
                }}
              >
                <a
                  href="https://www.facebook.com/ads/preferences"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook (advertising and analytics)
                </a>
              </li>
              <li
                style={{
                  listStyleType: "-moz-initial",
                  listStylePosition: "inside",
                  marginLeft: "40px",
                }}
              >
                <a
                  href="https://mixpanel.com/optout/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mixpanel (analytics)
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </Typography>

      <Typography variant="h5" gutterBottom>
        Right to Request Deletion of Personal Information
      </Typography>

      <Typography variant="body1" paragraph>
        Subject to certain limitations, you may request that we delete the
        Personal Information that we have collected about you. Upon verification
        of your request, we will queue your request for processing and notify
        you. If your request is denied, we will reply explaining why.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Right to Opt Out of the Sale of Personal Information
      </Typography>

      <Typography variant="body1" paragraph>
        Your Personal Information is “sold” (as we understand the term “sell” to
        be defined in the CCPA) when it is shared with a third party for
        monetary or other valuable consideration for a purpose that is not a
        “business purpose” as defined in the CCPA. We do not sell your Personal
        Information.
      </Typography>

      <Typography variant="body1" paragraph>
        If you would like to opt out of promotional email messages, you may do
        so by clicking the “Unsubscribe” link in any of the email messages you
        receive.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Right to Non-Discrimination for the Exercise of a Consumer’s Privacy
        Rights
      </Typography>

      <Typography variant="body1" paragraph>
        We will not discriminate against you for exercising your rights under
        the CCPA.
      </Typography>

      <Typography variant="body1" paragraph>
        To exercise the “Right to Know” or the “Right to Request Deletion,”
        please email{" "}
        <Link href="mailto:info@majikgift.com">info@majikgift.com</Link>. Before
        processing your request, we may ask to verify your identity or the
        identity of your authorized agent. Requests will be handled within the
        timeframes specified in the CCPA.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Information Sharing and Disclosure
      </Typography>

      <Typography variant="body1" paragraph>
        Your Personal Information will be used primarily in connection with
        operating and facilitating the Service. However, we may send your
        Personal Information to other companies or people:
      </Typography>

      <Typography variant="body1" paragraph component="div">
        <ul>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            When we have your consent to share the information;
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            When we need to share your information to provide the Service;
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            When we need to send the information to third-party service
            providers or other platforms who work on our behalf to provide the
            Service. The services provided by such third parties and partners
            include services in the following categories:
            <ul>
              <li
                style={{
                  listStyleType: "-moz-initial",
                  listStylePosition: "inside",
                  marginLeft: "40px",
                }}
              >
                Processing payments on our behalf;
              </li>
              <li
                style={{
                  listStyleType: "-moz-initial",
                  listStylePosition: "inside",
                  marginLeft: "40px",
                }}
              >
                Helping us to provide products or services that you request;
              </li>
              <li
                style={{
                  listStyleType: "-moz-initial",
                  listStylePosition: "inside",
                  marginLeft: "40px",
                }}
              >
                Sending marketing communications on our behalf;
              </li>
              <li
                style={{
                  listStyleType: "-moz-initial",
                  listStylePosition: "inside",
                  marginLeft: "40px",
                }}
              >
                Authenticating identities on our behalf;
              </li>
              <li
                style={{
                  listStyleType: "-moz-initial",
                  listStylePosition: "inside",
                  marginLeft: "40px",
                }}
              >
                Helping us to create or maintain our databases;
              </li>
              <li
                style={{
                  listStyleType: "-moz-initial",
                  listStylePosition: "inside",
                  marginLeft: "40px",
                }}
              >
                Helping us to research or analyze the people who use our
                Services;
              </li>
              <li
                style={{
                  listStyleType: "-moz-initial",
                  listStylePosition: "inside",
                  marginLeft: "40px",
                }}
              >
                Testing our Services;
              </li>
            </ul>
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            When we team up with another company to offer or provide products,
            services, contests, or promotions;
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            To perform data analyses (including market research); or
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            When we respond to subpoenas, court orders, or legal process; or
            find that your actions on our websites violate the Terms and
            Conditions, or any of our usage guidelines for specific products or
            services.
          </li>
        </ul>
      </Typography>

      <Typography variant="body1" paragraph>
        In connection with making the Services available to our users, we may
        disclose certain information about you (including your name, username,
        and date of birth) to other parties.
      </Typography>

      <Typography variant="body1" paragraph>
        Users of the Services and Advisors, solely as directed by you or as
        authorized under our terms of service.
      </Typography>

      <Typography variant="body1" paragraph>
        We may also share information collected about you with our auditors,
        legal advisors, and similar third parties in connection with our
        receiving their professional services, subject to standard
        confidentiality obligations.
      </Typography>

      <Typography variant="body1" paragraph>
        We share data with affiliates for the purposes of our group operations,
        including:
      </Typography>

      <Typography variant="body1" paragraph component="div">
        <ul>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            So that they may provide us, or we may provide them, with various
            services, including fraud detection and marketing services;
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            So that we may consolidate the information collected by us and our
            affiliates to ensure that each affiliate has the most complete and
            up-to-date information regarding you;
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            So that we can efficiently offer our services to you across all of
            our Platforms and tailor these to your preferences;
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            For the purposes of group market research/analysis and group
            satisfaction evaluations;
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            To improve our Platforms and develop new tools, features, products,
            and services;
          </li>
          <li style={{ listStyleType: "circle", listStylePosition: "inside" }}>
            For group marketing purposes. We and our affiliates will ensure that
            any necessary consents required by applicable law have been obtained
            before sending direct marketing communications.
          </li>
        </ul>
      </Typography>

      <Typography variant="h5" gutterBottom>
        Log Data
      </Typography>

      <Typography variant="body1" paragraph>
        We collect information sent to us when you visit the MAJIK GIFT website
        or use the mobile application (“Log Data”). This Log Data may include
        information such as your computer’s Internet Protocol (“IP”) address,
        browser type, browser language, referring/exit pages and URLs, platform
        type, number of clicks, domain names, the pages of our Service that you
        visit, the time and date of your visit, the time spent on those pages
        and other statistics. When you access the Service by or through a mobile
        device, we may collect certain information automatically, including, but
        not limited to, the type of mobile device you use, your mobile devices
        unique device ID, the IP address of your mobile device, your mobile
        operating system, the type of mobile Internet browser you use and other
        statistics. We log this information for our internal use to help
        diagnose technical problems and to further administer and improve the
        quality of our services to you.
      </Typography>

      <Typography variant="body1" paragraph>
        We also maintain a record of your IP address to analyse the use of our
        Services on an aggregate basis. This information is helpful to
        understand your preferences when using our Services and enables us to
        customize and tailor your experience with us to your likes and dislikes,
        as well as to your geographical location. Some of this information is
        analyzed and used internally in order to develop, market or advertise
        new products or services that we think might interest you. We may also
        share this information with affiliates, advertisers and other third
        parties at our sole discretion.
      </Typography>

      <Typography variant="body1" paragraph>
        In addition, we may use third-party services such as Google Analytics
        that collect, monitor, and analyze this type of information in order to
        increase our Service's functionality. This analysis helps us to (i)
        better understand your use of, or interest in, our products, services,
        content, as well as the products, services, and content offered by
        others.
      </Typography>

      <Typography variant="body1" paragraph>
        Others; (ii) communicate with you via email, regular mail, telephone,
        and/or mobile devices about products or services that you may be
        interested in; and (iii) develop, display, and tailor content and
        advertising to your interests.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Security
      </Typography>

      <Typography variant="body1" paragraph>
        The information you provide to us will be kept in our database. The
        security of your Personal Information is important to us, but remember
        that no method of transmission over the Internet or method of electronic
        storage is 100% secure. While we strive to use commercially acceptable
        means to protect your Personal Information, we cannot guarantee its
        absolute security, and any transmission of Personal Information is done
        at your own risk. We rely on professional hosting solutions that use
        reasonable care in maintaining security measures to protect you and our
        systems against unauthorized access, alteration, disclosure,
        destruction, or loss of personal data hosted on our system. These
        protections, however, are not a replacement for the security measures in
        your control. It is important that you protect against unauthorized
        access to your password and to your computer or mobile device.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Cookies
      </Typography>

      <Typography variant="body1" paragraph>
        Cookies are files with a small amount of data, which may include an
        anonymous unique identifier. Cookies are sent to your browser from a
        website and stored on your computer's hard drive. Cookies allow your
        server or device to store its own information and can be used to
        customize pages and automatically recognize you based on your past
        usage. Cookies can help streamline your user experience and specifically
        tailor your information for your experience.
      </Typography>

      <Typography variant="body1" paragraph>
        With your consent, where required, we use “cookies” to collect
        information. Rejecting consent for our use of cookies may affect your
        ability to use the Service, and some program features or services may
        not function properly if cookies are not placed. For more information on
        the cookies used by the Service and your rights in relation to these,
        please see our Cookies Policy linked in the footer of the applicable
        Service.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Do Not Track Disclosure
      </Typography>

      <Typography variant="body1" paragraph>
        We do not support Do Not Track (“DNT”). Do Not Track is a preference you
        can set in your web browser to inform websites that you do not want to
        be tracked. You can enable or disable Do Not Track by visiting the
        Preferences or Settings page of your web browser.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Third-Party Service Providers
      </Typography>

      <Typography variant="body1" paragraph>
        This Policy exclusively addresses our activities from our servers and
        does not make promises or guarantees as to other third-party sites or
        services that may be used in conjunction with our Service. We may employ
        third-party companies and individuals to facilitate our Service, provide
        the Service on our behalf, perform Service-related services, or assist
        us in analyzing how our Service is used. We take care to select and
        enter into agreements with third parties capable of maintaining
        appropriate security measures that are in line with our policies and
        relevant privacy laws and regulations.
      </Typography>

      <Typography variant="body1" paragraph>
        These third parties have access to your Personal Information only to
        perform these tasks on our behalf and are obligated not to disclose or
        use it for any other purpose. These third-party service providers have
        their own privacy policies addressing how they use such information.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Links to Other Sites
      </Typography>

      <Typography variant="body1" paragraph>
        Our Service may contain links to other sites that are not operated by
        us. If you click on a third-party link, you will be directed to that
        third party’s site. We strongly advise you to review the Policy of every
        site you visit. We have no control over and assume no responsibility for
        the content, privacy policies, or practices of any third-party sites or
        services.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Communications
      </Typography>

      <Typography variant="body1" paragraph>
        We may use your Personal Information to contact you with newsletters,
        marketing or promotional materials, and other information that may be of
        interest to you. You may opt out of receiving any or all of these
        communications from us by following the unsubscribe link or instructions
        provided in any email we send.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Compliance with Laws
      </Typography>

      <Typography variant="body1" paragraph>
        We will disclose your Personal Information where required to do so by
        law or subpoena or if we believe that such action is necessary to comply
        with the law and the reasonable requests of law enforcement or to
        protect the security or integrity of our Service. We reserve the right
        to release all types of information to law enforcement agencies if we
        determine, in our sole judgment, that either you have violated our
        policies or the release of information about you may protect the rights,
        property, or safety of us or another person.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Business Transaction
      </Typography>

      <Typography variant="body1" paragraph>
        If D & M REVOLUTIONS PTY LTD – MAJIK GIFT is involved in a merger,
        acquisition, asset sale, bankruptcy, or reorganization, your Personal
        Information may be shared as well as retained by us. By providing us
        with your Personal Information, you consent to that transfer.
      </Typography>

      <Typography variant="h5" gutterBottom>
        International Transfer
      </Typography>

      <Typography variant="body1" paragraph>
        Your information, including Personal Information, may be transferred to,
        and maintained on, computers located outside of your state, province,
        country, or other governmental jurisdiction where the data protection
        laws may differ from those from your jurisdiction.
      </Typography>

      <Typography variant="body1" paragraph>
        If you are located outside Australia and choose to provide information
        to us, please note that we transfer the information, including Personal
        Information, to Australia and process it there. Your consent to this
        Policy, followed by your submission of such information, represents your
        agreement to that transfer.
      </Typography>

      <Typography variant="body1" paragraph>
        Where you are located in the EU or UK and your personal data is
        transferred to a country that has not been deemed to provide an adequate
        level of protection of personal data when compared with the protections
        afforded under the GDPR, we will ensure such transfer is governed by an
        agreement that incorporates standard contractual clauses approved for
        these purposes by the relevant body in the EU and/or UK as appropriate.
        This ensures your personal data remains protected.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Children's Privacy
      </Typography>

      <Typography variant="body1" paragraph>
        Our Service is not marketed to individuals under the age of 18, or the
        equivalent minimum age in the relevant jurisdiction, and we do not
        knowingly collect personally identifiable information from children. We
        encourage parents to be involved in the online activities of their
        children to ensure that no information is collected from a child without
        verifiable parental permission. If we become aware that a child has
        provided us with Personal Information, we will delete such information
        from our servers as soon as possible.
      </Typography>

      <Typography variant="body1" paragraph>
        To use D & M REVOLUTIONS PTY LTD – MAJIK GIFT, you must be at least 18
        years of age. If you are under 18 years of age, please do not use our
        Service.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Changes to This Privacy Policy
      </Typography>

      <Typography variant="body1" paragraph>
        We reserve the right to replace, modify, or amend this Policy from time
        to time. It is your responsibility to review this Policy periodically
        for any changes. Changes to this Policy are effective when they are
        posted on this page, as reflected by updating the date at the beginning
        of this Policy, and your continued use of our Service represents your
        consent to any changes in our Policy. Any changes made will apply to
        information collected after the revised date.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Access to Personal Information
      </Typography>

      <Typography variant="body1" paragraph>
        If your Personal Information changes, or if you no longer desire our
        Service, you may correct, update, delete, or deactivate it by making the
        change on the member information page or by emailing us at{" "}
        <Link href="mailto:info@majikgift.com">info@majikgift.com</Link>.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Opt-Out
      </Typography>

      <Typography variant="body1" paragraph>
        If you give the company your Personal Information and you wish to opt
        out of receiving communications from us, our partners, or our
        third-party providers, simply click on the opt-out link provided in the
        email communication.
      </Typography>
    </Container>
  );
};

export default PrivacyPolicy;

const dataPoints = [
  "Email address",
  "Login name",
  "Full name",
  "Service Name / Show Name",
  "Stripe ID",
  "Stripe email address",
  "IP address",
  "Geographic location",
  "Profile photo",
  "Live chat transcripts, video and phone recordings",
  "In-app messages",
  "Reviews",
  "Information in your customer service inquiries",
];
