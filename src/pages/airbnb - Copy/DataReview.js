import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, UploadCloud, Image } from "lucide-react";
import axios from "axios";
import { useNotification } from "../../components/Notification";
import clsx from "clsx";
import stati from "./data/stati.json";
import comuni from "./data/comuni.json";
import documenti from "./data/documenti.json";
import province from "./data/province.json";
const DataReview = ({handleSubmit,formData,handleChange,}) => {
    const [error,setError] = useState({})


  return (
    <div className="w-full mx-auto p-6 sm:p-10">
      <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-10 border border-gray-100">
        <h2 className="text-3xl font-bold text-indigo-700 text-center mb-8">
          Review Your Data
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Reusable Field Wrapper */}
          {[
            {
              label: "First Name",
              name: "name",
              type: "text",
            },
            {
              label: "Last Name",
              name: "last_name",
              type: "text",
            },
            {
              label: "Birthdate",
              name: "birthdate",
              type: "date",
            },
          ].map(({ label, name, type }) => (
            <div key={name} className="flex flex-col">
              <label htmlFor={name} className="font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                id={name}
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className={clsx(
                  "w-full p-3 border rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition",
                  "border-gray-300",
                  error[name] && "border-red-500"
                )}
              />
              {error[name] && (
                <small className="text-sm text-red-500 mt-1">
                  {error[name]}
                </small>
              )}
            </div>
          ))}

          {/* Gender */}
          <div className="flex flex-col">
            <label htmlFor="gender" className="font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className={clsx(
                "w-full p-3 border rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition",
                "border-gray-300",
                error.gender && "border-red-500"
              )}
            >
              <option value="">Select Gender</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
            </select>
            {error.gender && (
              <small className="text-sm text-red-500 mt-1">
                {error.gender}
              </small>
            )}
          </div>

          {/* Country of Birth */}
          <div className="flex flex-col">
            <label
              htmlFor="paese_nascita_code"
              className="font-medium text-gray-700 mb-1"
            >
              Country of Birth
            </label>
            <select
              id="paese_nascita_code"
              name="paese_nascita_code"
              value={formData.paese_nascita_code}
              onChange={handleChange}
              required
              className={clsx(
                "w-full p-3 border rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition",
                "border-gray-300",
                (formData.paese_nascita_score < 0.8 ||
                  error.paese_nascita_code) &&
                  "border-red-500"
              )}
            >
              <option value="">Select Country</option>
              {stati.map(({ Codice, Descrizione }) => (
                <option key={Codice} value={Codice}>
                  {Descrizione}
                </option>
              ))}
            </select>
            {error.paese_nascita_code && (
              <small className="text-sm text-red-500 mt-1">
                {error.paese_nascita_code}
              </small>
            )}
          </div>

          {/* Citizenship */}
          <div className="flex flex-col">
            <label
              htmlFor="cittadinanza_code"
              className="font-medium text-gray-700 mb-1"
            >
              Citizenship
            </label>
            <select
              id="cittadinanza_code"
              name="cittadinanza_code"
              value={formData.cittadinanza_code}
              onChange={handleChange}
              required
              className={clsx(
                "w-full p-3 border rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition",
                "border-gray-300",
                (formData.cittadinanza_score < 0.8 ||
                  error.cittadinanza_code) &&
                  "border-red-500"
              )}
            >
              <option value="">Select Citizenship</option>
              {stati.map(({ Codice, Descrizione }) => (
                <option key={Codice} value={Codice}>
                  {Descrizione}
                </option>
              ))}
            </select>
            {error.cittadinanza_code && (
              <small className="text-sm text-red-500 mt-1">
                {error.cittadinanza_code}
              </small>
            )}
          </div>

          {/* Province and City of Birth */}
          {formData.paese_nascita_code === "100000100" && (
            <>
              <div className="flex flex-col">
                <label
                  htmlFor="provincia_nascita"
                  className="font-medium text-gray-700 mb-1"
                >
                  Province of Birth
                </label>
                <select
                  id="provincia_nascita"
                  name="provincia_nascita"
                  value={formData.provincia_nascita}
                  onChange={handleChange}
                  required
                  className={clsx(
                    "w-full p-3 border rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition",
                    "border-gray-300",
                    error.provincia_nascita && "border-red-500"
                  )}
                >
                  <option value="">Select Province</option>
                  {province.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                {error.provincia_nascita && (
                  <small className="text-sm text-red-500 mt-1">
                    {error.provincia_nascita}
                  </small>
                )}
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="comune_nascita_code"
                  className="font-medium text-gray-700 mb-1"
                >
                  City of Birth
                </label>
                <select
                  id="comune_nascita_code"
                  name="comune_nascita_code"
                  value={formData.comune_nascita_code}
                  onChange={handleChange}
                  required
                  className={clsx(
                    "w-full p-3 border rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition",
                    "border-gray-300",
                    (formData.comune_nascita_score < 0.8 ||
                      error.comune_nascita_code) &&
                      "border-red-500"
                  )}
                >
                  <option value="">Select City</option>
                  {comuni
                    .filter(
                      (comune) =>
                        comune.Provincia === formData.provincia_nascita
                    )
                    .map(({ Codice, Descrizione }) => (
                      <option key={Codice} value={Codice}>
                        {Descrizione}
                      </option>
                    ))}
                </select>
                {error.comune_nascita_code && (
                  <small className="text-sm text-red-500 mt-1">
                    {error.comune_nascita_code}
                  </small>
                )}
              </div>
            </>
          )}

          {/* Document Info */}
          {["16", "17", "18"].includes(formData.guest_type_code) && (
            <>
              <div className="flex flex-col">
                <label
                  htmlFor="tipo_documento_code"
                  className="font-medium text-gray-700 mb-1"
                >
                  Document Type
                </label>
                <select
                  id="tipo_documento_code"
                  name="tipo_documento_code"
                  value={formData.tipo_documento_code}
                  onChange={handleChange}
                  required
                  className={clsx(
                    "w-full p-3 border rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition",
                    "border-gray-300",
                    (formData.tipo_documento_score < 0.9 ||
                      error.tipo_documento_code) &&
                      "border-red-500"
                  )}
                >
                  <option value="">Select Document Type</option>
                  {documenti.map(({ Codice, Descrizione }) => (
                    <option key={Codice} value={Codice}>
                      {Descrizione}
                    </option>
                  ))}
                </select>
                {error.tipo_documento_code && (
                  <small className="text-sm text-red-500 mt-1">
                    {error.tipo_documento_code}
                  </small>
                )}
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="numero_documento"
                  className="font-medium text-gray-700 mb-1"
                >
                  Document Number
                </label>
                <input
                  id="numero_documento"
                  type="text"
                  name="numero_documento"
                  value={formData.numero_documento}
                  onChange={handleChange}
                  required
                  className={clsx(
                    "w-full p-3 border rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition",
                    "border-gray-300",
                    error.numero_documento && "border-red-500"
                  )}
                />
                {error.numero_documento && (
                  <small className="text-sm text-red-500 mt-1">
                    {error.numero_documento}
                  </small>
                )}
              </div>
            </>
          )}

          {/* Submit Button */}
          <div className="col-span-full">
            <button
              type="submit"
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg rounded-xl shadow-md transition duration-200"
            >
              {["16", "17", "18"].includes(formData.guest_type_code)
                ? "Submit & Verify"
                : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DataReview;