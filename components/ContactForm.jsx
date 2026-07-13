"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().min(1, "Name must be at least 3 characters long").required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  number: Yup.string()
    .matches(/^\d+$/, "Must be only digits")
    .min(10, "Mobile number must be at least 10 digits")
    .required("Mobile number is required"),
  location: Yup.string().required("City or village name is required"),
  message: Yup.string().min(1, "Message must be at least 10 characters").required("Message is required"),
});

export default function ContactForm() {
  return (
    <Formik
      initialValues={{ name: "", email: "", number: "", location: "", message: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await new Promise((r) => setTimeout(r, 300));
        const el = document.getElementById("successMessage");
        if (el) el.innerText = "Your message was sent successfully";
        resetForm();
      }}
    >
      <Form>
        <div className="fields">
          <label>Name</label>
          <Field placeholder="Enter Your Name" name="name" type="text" />
          <ErrorMessage name="name" component="div" className="error" />
        </div>

        <div className="fields">
          <label>Email</label>
          <Field placeholder="Enter Your Email" name="email" type="email" />
          <ErrorMessage name="email" component="div" className="error" />
        </div>

        <div className="fields">
          <label>Mobile Number</label>
          <Field placeholder="Enter Your Number" name="number" type="text" />
          <ErrorMessage name="number" component="div" className="error" />
        </div>

        <div className="fields">
          <label>City, Village Name</label>
          <Field placeholder="Your City or village name *" name="location" type="text" />
          <ErrorMessage name="location" component="div" className="error" />
        </div>

        <div className="fields">
          <label>Message</label>
          <Field as="textarea" name="message" rows="5" placeholder="Message" />
          <ErrorMessage name="message" component="div" className="error" />
        </div>

        <button type="submit">Send</button>

        <div id="successMessage" style={{ color: "green", marginTop: "10px" }}></div>
      </Form>
    </Formik>
  );
}
