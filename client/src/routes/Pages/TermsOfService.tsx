import React from 'react';
import Header from '~/routes/Pages/Header';
import Footer from '~/routes/Pages/Footer';
import { useSEO } from '~/hooks/useSEO';
import { SEO_DATA } from '~/seo/seoData';

/**
 * Component for displaying the Terms of Service page
 * @returns Terms of Service React component
 */
export default function TermsOfService() {
  useSEO(SEO_DATA.terms);

  return (
    <>
      <Header />
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-6 text-3xl font-semibold">Omnexio Terms of Service</h1>
        <p className="mb-4 text-sm italic">Last updated: October 1, 2025</p>

        <div className="dark:prose-invert">
          <section className="mb-6">
            <h2 className="mb-4 mt-6 text-2xl font-medium">1. Introduction</h2>
            <p className="mb-4">
              Welcome to DOTSOA OOD ("Company", "we", "our", "us")! These Terms of Service ("Terms",
              "Terms of Service") govern your use of our AI-powered search engine located at{' '}
              <a className="text-blue-500" href="https://omnexio.com">
                https://omnexio.com
              </a>{' '}
              operated by DOTSOA OOD.
            </p>
            <p className="mb-4">
              DOTSOA OOD is a company organized under the laws of Bulgaria, with legal entity number
              201700413, and a registered office at Tsarigradsko Shose Blvd No. 115M, European Trade
              Center, Building D, Floor 1, Sofia, Bulgaria.
            </p>
            <p className="mb-4">
              Our Privacy Policy also governs your use of our Service and explains how we collect,
              safeguard and disclose information that results from your use of our platform. Please
              read it on our website.
            </p>
            <p className="mb-4">
              Your agreement with us includes these Terms and our Privacy Policy ("Agreements"). You
              acknowledge that you have read and understood Agreements, and agree to be bound by
              them.
            </p>
            <p className="mb-4">
              If you do not agree with (or cannot comply with) Agreements, then you may not use the
              Service, but please let us know by emailing at{' '}
              <a className="text-blue-500" href="mailto:admin@omnexio.com">
                admin@omnexio.com
              </a>{' '}
              so we can try to find a solution. These Terms apply to all visitors, users and others
              who wish to access or use Service.
            </p>
            <p className="mb-4 font-bold">
              IMPORTANT: PLEASE READ THIS DOCUMENT CAREFULLY. BY USING OMNEXIO, YOU CONSENT TO THESE
              TERMS OF SERVICE.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="mb-4 mt-6 text-2xl font-medium">2. About Omnexio</h2>
            <p className="mb-4">
              Omnexio is an AI-powered search engine that provides users with intelligent search
              capabilities and access to information through advanced artificial intelligence
              technologies. The platform integrates third-party Large Language Models ("LLMs"),
              including but not limited to those developed by OpenAI, Anthropic, DeepSeek, Meta,
              Google, and Alibaba ("Third-Party AI Models") to enhance search results, provide
              AI-generated summaries, and offer interactive features.
            </p>
            <p className="mb-4">
              Omnexio serves primarily as an AI search engine while also providing access to various
              AI models for specific use cases such as learning, writing assistance, translation,
              programming support, and other applications. Omnexio aggregates and interfaces with
              Third-Party AI Models but does not generate AI outputs itself and is not responsible
              for the content, services, or performance of these Third-Party AI Models.
            </p>
            <p className="mb-4">
              Omnexio reserves the right, at its sole discretion, to add, remove, or update
              features, Third-Party AI Models, or services available on the platform at any time
              without prior notice.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="mb-4 mt-6 text-2xl font-medium">3. Age Requirements</h2>
            <p className="mb-4">
              Use of Omnexio by anyone under 13 years of age is prohibited. You represent that you
              are at least the age of majority in the jurisdiction where you live or, if you are
              not, your parent or legal guardian must consent to these Terms of Service and affirm
              that they accept these Terms on your behalf and bear responsibility for your use.
            </p>
            <p className="mb-4">
              Service is intended only for access and use by individuals at least thirteen (13)
              years old. By accessing or using Omnexio, you warrant and represent that you are at
              least thirteen (13) years of age and with the full authority, right, and capacity to
              enter into this agreement and abide by all of the terms and conditions of Terms.
              Content accessed via Omnexio may produce results that are not suitable for minors.
            </p>
            <p className="mb-4">
              If you are accepting these Terms of Service on behalf of someone else or an entity,
              you confirm that you have the legal authority to bind that person or entity to these
              Terms.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="mb-4 mt-6 text-2xl font-medium">4. Communications</h2>
            <p className="mb-4">
              By creating an Account on our Service, you agree to subscribe to newsletters,
              marketing or promotional materials and other information we may send. However, you may
              opt out of receiving any, or all, of these communications from us by following the
              unsubscribe link or by emailing{' '}
              <a className="text-blue-500" href="mailto:admin@omnexio.com">
                admin@omnexio.com
              </a>
              .
            </p>
          </section>

          <section className="mb-6">
            <h2 className="mb-4 mt-6 text-2xl font-medium">5. Your Use of Omnexio</h2>

            <h3 className="mb-2 mt-4 text-lg font-medium">5.1 License to Use</h3>
            <p className="mb-4">
              Subject to your compliance with these Terms, we grant you a personal, non-exclusive,
              non-transferable right to use Omnexio and its services.
            </p>

            <h3 className="mb-2 mt-4 text-lg font-medium">5.2 User Acknowledgments</h3>
            <p className="mb-2">You acknowledge and agree that:</p>
            <ul className="mb-4 list-disc space-y-2 pl-6">
              <li>
                Search results and AI-generated responses provided by Omnexio involve artificial
                intelligence systems powered by Third-Party AI Models, such as those provided by
                OpenAI, Anthropic, DeepSeek, Meta, Google, or Alibaba;
              </li>
              <li>
                All AI-generated content, summaries, and responses are produced by Third-Party AI
                Models. Omnexio does not control or generate these outputs and does not guarantee
                their accuracy, reliability, appropriateness, or timeliness;
              </li>
              <li>
                Information provided through search results and AI responses may be inaccurate,
                incomplete, or outdated, and you should independently verify any information before
                relying on it;
              </li>
              <li>
                Omnexio should not be relied upon during emergencies or for critical decisions;
              </li>
              <li>
                Omnexio and its services are subject to modification and may contain errors, design
                flaws, or other issues. DOTSOA OOD does not provide any warranties or guarantees
                regarding the performance, functionality, or availability of Omnexio;
              </li>
              <li>
                Use of Omnexio may result in unexpected results, loss of data, communications
                failures, or other anticipated or unanticipated damages or losses;
              </li>
              <li>Omnexio is provided on an "AS IS" basis, and access is not guaranteed;</li>
              <li>
                Omnexio may not operate properly, may not be in final form, or may not be fully
                functional, and DOTSOA OOD disclaims any liability for such issues.
              </li>
            </ul>

            <h3 className="mb-2 mt-4 text-lg font-medium">5.3 Prohibited Uses</h3>
            <p className="mb-2">You agree not to use Omnexio to:</p>
            <ul className="mb-4 list-disc space-y-2 pl-6">
              <li>
                Engage in activities prohibited by applicable laws, including but not limited to
                those banned under the EU AI Act, such as conducting biometric identification or
                categorization without explicit user consent, implementing social scoring systems,
                or exploiting vulnerabilities of individuals or groups;
              </li>
              <li>Promote discrimination, harassment, hate speech, or any illegal activities;</li>
              <li>
                Use Omnexio for high-risk purposes, such as healthcare diagnostics, employment
                selection, legal advice, or other applications that may significantly impact
                individuals' rights or well-being, unless explicitly authorized by DOTSOA OOD with
                appropriate safeguards in place;
              </li>
              <li>
                Violate the rights of any party, including intellectual property, privacy, or
                contractual rights;
              </li>
              <li>
                Reverse assemble, reverse compile, decompile, translate, or otherwise attempt to
                discover the source code, algorithms, or underlying components of Omnexio or the
                Third-Party AI Models powering it;
              </li>
              <li>
                Abuse, harm, interfere with, reverse engineer, or disrupt Omnexio or its underlying
                technologies, including accessing or using them in fraudulent or deceptive ways,
                introducing malware, spamming, hacking, or bypassing protective measures;
              </li>
              <li>
                Use Omnexio in an automated manner that exceeds any rate limits or usage
                restrictions set by DOTSOA OOD;
              </li>
              <li>
                Use any robot, spider, or other automatic device, process, or means to access
                Service for any purpose beyond normal user interaction, including monitoring or
                copying material without authorization;
              </li>
              <li>
                Develop products, applications, services, or models that compete with Omnexio or its
                underlying Third-Party AI Models;
              </li>
              <li>
                Extract data from Omnexio using methods such as web scraping, web harvesting, or web
                data extraction, except as expressly permitted by these Terms;
              </li>
              <li>Misrepresent AI-generated content as human-generated;</li>
              <li>
                Rely solely on AI-generated outputs for decisions with significant consequences,
                including financial, legal, medical, or safety-related decisions;
              </li>
              <li>
                Impersonate or attempt to impersonate Company, a Company employee, another user, or
                any other person or entity;
              </li>
              <li>
                Introduce any viruses, trojan horses, worms, logic bombs, or other material which is
                malicious or technologically harmful;
              </li>
              <li>
                Attack Service via a denial-of-service attack or a distributed denial-of-service
                attack;
              </li>
              <li>Otherwise attempt to interfere with the proper working of Service.</li>
            </ul>

            <h3 className="mb-2 mt-4 text-lg font-medium">5.4 Feedback</h3>
            <p className="mb-4">
              We welcome your feedback and suggestions about how to improve Omnexio. By submitting
              feedback, you agree to grant us the right, at our discretion, to use, copy, disclose,
              create derivative works, display, publish, and otherwise exploit the feedback, in
              whole or part, freely and without any compensation to you.
            </p>
            <p className="mb-4">
              You acknowledge and agree that: (i) you shall not retain, acquire or assert any
              intellectual property right or other right, title or interest in or to the Feedback;
              (ii) Company may have development ideas similar to the Feedback; (iii) Feedback does
              not contain confidential information or proprietary information from you or any third
              party; and (iv) Company is not under any obligation of confidentiality with respect to
              the Feedback.
            </p>
            <p className="mb-4">
              Please provide your feedback by emailing us at{' '}
              <a className="text-blue-500" href="mailto:admin@omnexio.com">
                admin@omnexio.com
              </a>
              .
            </p>
          </section>

          <section className="mb-6">
            <h2 className="mb-4 mt-6 text-2xl font-medium">6. Purchases and Subscriptions</h2>

            <h3 className="mb-2 mt-4 text-lg font-medium">6.1 Purchases</h3>
            <p className="mb-4">
              If you wish to purchase any product or service made available through Service
              ("Purchase"), you may be asked to supply certain information relevant to your Purchase
              including, without limitation, your credit card number, the expiration date of your
              credit card, your billing address, and your shipping information.
            </p>
            <p className="mb-4">
              You represent and warrant that: (i) you have the legal right to use any credit card(s)
              or other payment method(s) in connection with any Purchase; and that (ii) the
              information you supply to us is true, correct and complete.
            </p>
            <p className="mb-4">
              We may employ the use of third party services for the purpose of facilitating payment
              and the completion of Purchases. By submitting your information, you grant us the
              right to provide the information to these third parties subject to our Privacy Policy.
            </p>
            <p className="mb-4">
              We reserve the right to refuse or cancel your order at any time for reasons including
              but not limited to: product or service availability, errors in the description or
              price of the product or service, error in your order or other reasons, or if fraud or
              an unauthorized or illegal transaction is suspected.
            </p>

            <h3 className="mb-2 mt-4 text-lg font-medium">6.2 Subscriptions</h3>
            <p className="mb-4">
              Some parts of Service are billed on a subscription basis ("Subscription(s)"). You will
              be billed in advance on a recurring and periodic basis ("Billing Cycle"). Billing
              cycles are set either on a monthly or annual basis, depending on the type of
              subscription plan you select when purchasing a Subscription.
            </p>
            <p className="mb-4">
              At the end of each Billing Cycle, your Subscription will automatically renew under the
              exact same conditions unless you cancel it or DOTSOA OOD cancels it. You may cancel
              your Subscription renewal either through your online account management page or by
              contacting DOTSOA OOD customer support team at{' '}
              <a className="text-blue-500" href="mailto:admin@omnexio.com">
                admin@omnexio.com
              </a>
              .
            </p>
            <p className="mb-4">
              A valid payment method, including credit card or PayPal, is required to process the
              payment for your subscription. You shall provide DOTSOA OOD with accurate and complete
              billing information including full name, address, state, zip code, telephone number,
              and a valid payment method information. By submitting such payment information, you
              automatically authorize DOTSOA OOD to charge all Subscription fees incurred through
              your account to any such payment instruments.
            </p>
            <p className="mb-4">
              Should automatic billing fail to occur for any reason, DOTSOA OOD will issue an
              electronic invoice indicating that you must proceed manually, within a certain
              deadline date, with the full payment corresponding to the billing period as indicated
              on the invoice.
            </p>

            <h3 className="mb-2 mt-4 text-lg font-medium">6.3 Free Trial</h3>
            <p className="mb-4">
              DOTSOA OOD may, at its sole discretion, offer a Subscription with a free trial for a
              limited period of time ("Free Trial").
            </p>
            <p className="mb-4">
              You may be required to enter your billing information in order to sign up for Free
              Trial. If you do enter your billing information when signing up for Free Trial, you
              will not be charged by DOTSOA OOD until Free Trial has expired. On the last day of
              Free Trial period, unless you cancelled your Subscription, you will be automatically
              charged the applicable Subscription fees for the type of Subscription you have
              selected.
            </p>
            <p className="mb-4">
              At any time and without notice, DOTSOA OOD reserves the right to (i) modify Terms of
              Service of Free Trial offer, or (ii) cancel such Free Trial offer.
            </p>

            <h3 className="mb-2 mt-4 text-lg font-medium">6.4 Fee Changes</h3>
            <p className="mb-4">
              DOTSOA OOD, in its sole discretion and at any time, may modify Subscription fees for
              the Subscriptions. Any Subscription fee change will become effective at the end of the
              then-current Billing Cycle.
            </p>
            <p className="mb-4">
              DOTSOA OOD will provide you with a reasonable prior notice of any change in
              Subscription fees to give you an opportunity to terminate your Subscription before
              such change becomes effective.
            </p>
            <p className="mb-4">
              Your continued use of Service after Subscription fee change comes into effect
              constitutes your agreement to pay the modified Subscription fee amount.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="mb-4 mt-6 text-2xl font-medium">7. Your Content</h2>

            <h3 className="mb-2 mt-4 text-lg font-medium">7.1 Your Content</h3>
            <p className="mb-4">
              Omnexio enables you to interact with the platform by conducting searches, asking
              questions, creating bookmarks, voting or liking, posting, or sharing content within
              Omnexio or externally. All material you upload, publish, or display within Omnexio,
              including but not limited to your search queries, prompts, inputs, and any results or
              outputs generated in response to your interactions ("AI-Generated Content"),
              collectively constitute "Your Content."
            </p>
            <p className="mb-4">
              In accordance with the General Data Protection Regulation (GDPR) and other applicable
              data protection laws, Omnexio collects and processes Your Content solely to provide,
              maintain, and improve the platform's functionality and services. This may include
              storing your inputs and AI-Generated Content to facilitate your interactions,
              analyzing usage patterns to enhance user experience, and ensuring the security and
              integrity of the platform.
            </p>
            <p className="mb-4">
              Omnexio processes Your Content in a manner that respects your privacy rights and
              complies with all relevant legal obligations. For detailed information on the types of
              data collected, the purposes of processing, and your rights regarding your personal
              data, please refer to our{' '}
              <a className="text-blue-500" href="/pages/privacy-policy">
                Privacy Policy
              </a>
              .
            </p>

            <h3 className="mb-2 mt-4 text-lg font-medium">7.2 Ownership</h3>
            <p className="mb-4">
              You retain ownership of Your Content, subject to the non-exclusive rights granted
              below.
            </p>

            <h3 className="mb-2 mt-4 text-lg font-medium">7.3 Your Responsibility</h3>
            <p className="mb-4">
              You are responsible for Your Content and for ensuring that it does not violate any
              applicable law, these Terms (including the Prohibited Uses in Section 5.3 above), our
              policies, or the policies of any Third-Party AI Models which power services within
              Omnexio.
            </p>
            <p className="mb-4">
              By posting Content on or through Service, you represent and warrant that: (i) Content
              is yours (you own it) and/or you have the right to use it and the right to grant us
              the rights and license as provided in these Terms, and (ii) that the posting of your
              Content on or through Service does not violate the privacy rights, publicity rights,
              copyrights, contract rights or any other rights of any person or entity.
            </p>
            <p className="mb-4">
              We reserve the right to block, remove, and/or permanently delete Your Content if it is
              in breach of these Terms, our policies, the policies of any Third-Party AI Models, or
              violates any applicable law or regulation, or if it creates risk for DOTSOA OOD or
              Omnexio or negatively impacts the experience of other Omnexio users.
            </p>
            <p className="mb-4">
              We reserve the right to terminate the account of anyone found to be infringing on a
              copyright or otherwise violating these Terms.
            </p>

            <h3 className="mb-2 mt-4 text-lg font-medium">7.4 Our Use of Your Content</h3>
            <p className="mb-2">
              We may use Your Content to provide and improve Omnexio, including:
            </p>
            <ul className="mb-4 list-disc space-y-2 pl-6">
              <li>
                Providing your search queries and prompts to Third-Party AI Models to generate
                responses and search results;
              </li>
              <li>Displaying Your Content to others if you use the sharing features in Omnexio;</li>
              <li>
                Making available your shared content for others to view and interact with within
                Omnexio;
              </li>
              <li>Promoting your shared content to others;</li>
              <li>Understanding your use of Omnexio to generally improve the Omnexio services;</li>
              <li>Training and improving our search algorithms and AI systems.</li>
            </ul>
            <p className="mb-4">
              We may also need to use or disclose Your Content to comply with applicable laws,
              enforce these Terms of Service and our policies, and to detect and prevent fraud,
              security, or technical issues.
            </p>
            <p className="mb-4">
              By using Omnexio, you grant us a worldwide, non-exclusive, royalty-free, transferable,
              and perpetual license to use, modify, publicly perform, publicly display, reproduce,
              and distribute Your Content as stated above. You agree that this license includes the
              right for us to make your Content available to other users of Service, who may also
              use your Content subject to these Terms.
            </p>
            <p className="mb-4">
              DOTSOA OOD has the right but not the obligation to monitor and edit all Content
              provided by users.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="mb-4 mt-6 text-2xl font-medium">8. Accounts</h2>
            <p className="mb-4">
              When you create an account with us, you guarantee that the information you provide us
              is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete
              information may result in the immediate termination of your account on Service.
            </p>
            <p className="mb-4">
              You are responsible for maintaining the confidentiality of your account and password,
              including but not limited to the restriction of access to your computer and/or
              account. You agree to accept responsibility for any and all activities or actions that
              occur under your account and/or password, whether your password is with our Service or
              a third-party service. You must notify us immediately upon becoming aware of any
              breach of security or unauthorized use of your account.
            </p>
            <p className="mb-4">
              You may not use as a username the name of another person or entity or that is not
              lawfully available for use, a name or trademark that is subject to any rights of
              another person or entity other than you, without appropriate authorization. You may
              not use as a username any name that is offensive, vulgar or obscene.
            </p>
            <p className="mb-4">
              We reserve the right to refuse service, terminate accounts, remove or edit content, or
              cancel orders in our sole discretion.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="mb-4 mt-6 text-2xl font-medium">9. Privacy</h2>
            <p className="mb-4">
              As detailed in the Omnexio Privacy Policy, we may collect certain personal information
              related to your use of Omnexio (including contact information, search queries,
              interaction data, etc.). Your account information is anonymized before being shared
              with Third-Party AI Model providers where applicable.
            </p>
            <p className="mb-4">
              Third-party developers and AI Model providers may receive details about your
              interactions with Omnexio (including the contents of your searches, queries, chats,
              etc.) to provide responses and to generally improve their services. There is no need
              to share sensitive personal information with the service (such as credit card
              information beyond payment processing, social security information, etc.).
            </p>
            <p className="mb-4">
              For more information about Omnexio's privacy practices, please visit the Omnexio{' '}
              <a className="text-blue-500" href="/pages/privacy-policy">
                Privacy Policy
              </a>
              .
            </p>
          </section>

          <section className="mb-6">
            <h2 className="mb-4 mt-6 text-2xl font-medium">10. Analytics</h2>
            <p className="mb-4">
              We may use third-party Service Providers to monitor and analyze the use of our
              Service, including but not limited to Google Analytics and Cloudflare Analytics. These
              services help us understand how users interact with Omnexio to improve our platform.
            </p>
            <p className="mb-4">
              For more information on the privacy practices of these services, please visit their
              respective privacy policy pages.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="mb-4 mt-6 text-2xl font-medium">11. Intellectual Property</h2>
            <p className="mb-4">
              Service and its original content (excluding Content provided by users), features and
              functionality are and will remain the exclusive property of DOTSOA OOD and its
              licensors. Service is protected by copyright, trademark, and other laws of Bulgaria
              and international treaties. Our trademarks and trade dress may not be used in
              connection with any product or service without the prior written consent of DOTSOA
              OOD.
            </p>
            <p className="mb-4">
              Content found on or through this Service is the property of DOTSOA OOD or used with
              permission. You may not distribute, modify, transmit, reuse, download, repost, copy,
              or use said Content, whether in whole or in part, for commercial purposes or for
              personal gain, without express advance written permission from us.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="mb-4 mt-6 text-2xl font-medium">12. Copyright Policy</h2>
            <p className="mb-4">
              We respect the intellectual property rights of others. It is our policy to respond to
              any claim that Content posted on Service infringes on the copyright or other
              intellectual property rights ("Infringement") of any person or entity.
            </p>
            <p className="mb-4">
              If you are a copyright owner, or authorized on behalf of one, and you believe that the
              copyrighted work has been copied in a way that constitutes copyright infringement,
              please submit your claim via email to{' '}
              <a className="text-blue-500" href="mailto:admin@omnexio.com">
                admin@omnexio.com
              </a>
              , with the subject line: "Copyright Infringement" and include in your claim a detailed
              description of the alleged Infringement.
            </p>
            <p className="mb-4">
              You may be held accountable for damages (including costs and attorneys' fees) for
              misrepresentation or bad-faith claims on the infringement of any Content found on
              and/or through Service on your copyright.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="mb-4 mt-6 text-2xl font-medium">13. Links to Other Sites</h2>
            <p className="mb-4">
              Our Service may contain links to third party web sites or services that are not owned
              or controlled by DOTSOA OOD, including search results that link to external websites.
            </p>
            <p className="mb-4">
              DOTSOA OOD has no control over, and assumes no responsibility for the content, privacy
              policies, or practices of any third party web sites or services. We do not warrant the
              offerings of any of these entities/individuals or their websites.
            </p>
            <p className="mb-4 font-bold">
              YOU ACKNOWLEDGE AND AGREE THAT DOTSOA OOD SHALL NOT BE RESPONSIBLE OR LIABLE, DIRECTLY
              OR INDIRECTLY, FOR ANY DAMAGE OR LOSS CAUSED OR ALLEGED TO BE CAUSED BY OR IN
              CONNECTION WITH USE OF OR RELIANCE ON ANY SUCH CONTENT, GOODS OR SERVICES AVAILABLE ON
              OR THROUGH ANY SUCH THIRD PARTY WEB SITES OR SERVICES.
            </p>
            <p className="mb-4 font-bold">
              WE STRONGLY ADVISE YOU TO READ THE TERMS OF SERVICE AND PRIVACY POLICIES OF ANY THIRD
              PARTY WEB SITES OR SERVICES THAT YOU VISIT.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="mb-4 mt-6 text-2xl font-medium">
              14. DISCLAIMERS AND LIMITATION OF LIABILITY
            </h2>

            <h3 className="mb-2 mt-4 text-lg font-medium">14.1 Disclaimer of Warranty</h3>
            <p className="mb-4 font-bold">
              THESE SERVICES ARE PROVIDED BY COMPANY ON AN "AS IS" AND "AS AVAILABLE" BASIS. COMPANY
              MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE
              OPERATION OF THEIR SERVICES, OR THE INFORMATION, CONTENT OR MATERIALS INCLUDED
              THEREIN. YOU EXPRESSLY AGREE THAT YOUR USE OF THESE SERVICES, THEIR CONTENT, AND ANY
              SERVICES OR ITEMS OBTAINED FROM US IS AT YOUR SOLE RISK.
            </p>
            <p className="mb-4 font-bold">
              DOTSOA OOD DOES NOT GUARANTEE THE CONTINUOUS AVAILABILITY, FUNCTIONALITY, OR
              PERFORMANCE OF OMNEXIO, ITS SEARCH ENGINE, AI FEATURES, OR SERVICES, NOR THE
              AVAILABILITY OF ANY SPECIFIC THIRD-PARTY AI MODELS. OMNEXIO MAY, AT ITS SOLE
              DISCRETION AND WITHOUT PRIOR NOTICE, ADD, REMOVE, MODIFY, OR LIMIT THE AVAILABILITY OF
              FEATURES OR SERVICES.
            </p>
            <p className="mb-4 font-bold">
              DOTSOA OOD AND ITS THIRD-PARTY AI PROVIDERS ARE NOT RESPONSIBLE FOR THE ACCURACY,
              RELIABILITY, APPROPRIATENESS, OR TIMELINESS OF ANY SEARCH RESULTS OR AI-GENERATED
              OUTPUTS. YOU ACKNOWLEDGE THAT RELIANCE ON SEARCH RESULTS OR AI-GENERATED CONTENT IS AT
              YOUR SOLE RISK.
            </p>
            <p className="mb-4 font-bold">
              COMPANY HEREBY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED,
              STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
              MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR PURPOSE.
            </p>
            <p className="mb-4 font-bold">
              THE FOREGOING DOES NOT AFFECT ANY WARRANTIES WHICH CANNOT BE EXCLUDED OR LIMITED UNDER
              APPLICABLE LAW.
            </p>

            <h3 className="mb-2 mt-4 text-lg font-medium">14.2 Limitation of Liability</h3>
            <p className="mb-4 font-bold">
              EXCEPT AS PROHIBITED BY LAW, YOU WILL HOLD US AND OUR OFFICERS, DIRECTORS, EMPLOYEES,
              AND AGENTS HARMLESS FOR ANY INDIRECT, PUNITIVE, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL
              DAMAGE, HOWEVER IT ARISES (INCLUDING ATTORNEYS' FEES AND ALL RELATED COSTS AND
              EXPENSES OF LITIGATION AND ARBITRATION, OR AT TRIAL OR ON APPEAL, IF ANY, WHETHER OR
              NOT LITIGATION OR ARBITRATION IS INSTITUTED), WHETHER IN AN ACTION OF CONTRACT,
              NEGLIGENCE, OR OTHER TORTIOUS ACTION, OR ARISING OUT OF OR IN CONNECTION WITH THIS
              AGREEMENT.
            </p>
            <p className="mb-4 font-bold">
              EXCEPT AS PROHIBITED BY LAW, IF THERE IS LIABILITY FOUND ON THE PART OF COMPANY, IT
              WILL BE LIMITED TO THE AMOUNT PAID FOR THE PRODUCTS AND/OR SERVICES, AND UNDER NO
              CIRCUMSTANCES WILL THERE BE CONSEQUENTIAL OR PUNITIVE DAMAGES.
            </p>
            <p className="mb-4 font-bold">
              DOTSOA OOD MAY UTILIZE THIRD-PARTY ARTIFICIAL INTELLIGENCE DETECTION SERVICES. THESE
              SERVICES OPERATE INDEPENDENTLY AND ARE NOT DEVELOPED, CONTROLLED, OR GUARANTEED BY
              DOTSOA OOD. ACCORDINGLY, DOTSOA OOD DISCLAIMS ALL RESPONSIBILITY AND LIABILITY FOR THE
              ACCURACY, RELIABILITY, OR CONSEQUENCES OF ANY RESULTS GENERATED BY SUCH SERVICES.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="mb-4 mt-6 text-2xl font-medium">15. Termination</h2>
            <p className="mb-4">
              You may cease your use of Omnexio or terminate these Terms of Service at any time for
              any reason or no reason by deleting your account in your settings or by simply
              discontinuing use of Service.
            </p>
            <p className="mb-4">
              We may terminate or suspend your account and bar access to Service immediately,
              without prior notice or liability, under our sole discretion, for any reason
              whatsoever and without limitation, including but not limited to a breach of Terms.
            </p>
            <p className="mb-4">
              All provisions of Terms which by their nature should survive termination shall survive
              termination, including, without limitation, ownership provisions, warranty
              disclaimers, indemnity and limitations of liability. Any data collected prior to
              termination may continue to be used in accordance with these Terms.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="mb-4 mt-6 text-2xl font-medium">16. Governing Law</h2>
            <p className="mb-4">
              These Terms shall be governed and construed in accordance with the laws of Bulgaria
              without regard to its conflict of law provisions.
            </p>
            <p className="mb-4">
              Our failure to enforce any right or provision of these Terms will not be considered a
              waiver of those rights. If any provision of these Terms is held to be invalid or
              unenforceable by a court, the remaining provisions of these Terms will remain in
              effect.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="mb-4 mt-6 text-2xl font-medium">17. Changes to Terms of Service</h2>
            <p className="mb-4">
              DOTSOA OOD reserves the right to modify, amend, or update these Terms of Service at
              any time, at its sole discretion, to reflect changes in applicable laws, regulations,
              business practices, or platform operations.
            </p>
            <p className="mb-4">
              We may amend Terms at any time by posting the amended terms on our website. It is your
              responsibility to review these Terms periodically. Your continued use of Omnexio
              following the posting of revised Terms means that you accept and agree to the changes.
            </p>
            <p className="mb-4">
              In the event of material changes to these Terms of Service, DOTSOA OOD will notify
              users through reasonable means, which may include posting a notice on the Omnexio
              platform, sending an email to the address associated with your account, or providing
              an in-platform notification.
            </p>
            <p className="mb-4">
              By continuing to access or use our Service after any revisions become effective, you
              agree to be bound by the revised terms. If you do not agree to the new terms, you are
              no longer authorized to use Service.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="mb-4 mt-6 text-2xl font-medium">18. Acknowledgement</h2>
            <p className="mb-4 font-bold">
              BY USING SERVICE OR OTHER SERVICES PROVIDED BY US, YOU ACKNOWLEDGE THAT YOU HAVE READ
              THESE TERMS OF SERVICE AND AGREE TO BE BOUND BY THEM.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="mb-4 mt-6 text-2xl font-medium">19. Contact Us</h2>
            <p className="mb-4">
              Please send your feedback, comments, requests for technical support, or any questions:
            </p>
            <p className="mb-2">
              <strong>By email:</strong>{' '}
              <a className="text-blue-500" href="mailto:admin@omnexio.com">
                admin@omnexio.com
              </a>
            </p>
            <p className="mb-4">
              <strong>By mail:</strong> DOTSOA OOD, Tsarigradsko Shose Blvd No. 115M, European Trade
              Center, Building D, Floor 1, Sofia, Bulgaria
            </p>
          </section>

          <hr className="my-8" />
          <p className="text-center text-sm italic">Last updated: October 1, 2025</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
