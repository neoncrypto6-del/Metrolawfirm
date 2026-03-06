import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { PageTransition } from '../components/PageTransition';
import { GoldDivider } from '../components/GoldDivider';
import { ContactForm } from '../components/ContactForm';
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon } from 'lucide-react';
// Fix Leaflet default icon issue
const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl:
  'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
export function ContactPage() {
  return (
    <PageTransition>
      {/* Import Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />


      <div className="pt-32 pb-20 bg-metro-black text-center px-4">
        <h1 className="text-5xl md:text-7xl font-playfair text-white mb-6">
          Contact Us
        </h1>
        <p className="text-metro-gold tracking-widest uppercase text-sm font-medium">
          Schedule a Confidential Consultation
        </p>
      </div>

      <GoldDivider />

      <section className="py-24 bg-metro-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Form Area (Now First) */}
            <div className="lg:col-span-2 order-1">
              <div className="bg-metro-black border border-metro-border p-8 md:p-12">
                <h2 className="text-3xl font-playfair text-white mb-2">
                  Send an Inquiry
                </h2>
                <p className="text-metro-muted mb-8">
                  Please fill out the form below. A member of our team will
                  respond within 24 hours.
                </p>
                <ContactForm />
              </div>
            </div>

            {/* Contact Info Sidebar (Now Second) */}
            <div className="lg:col-span-1 space-y-12 order-2">
              <div>
                <h3 className="text-2xl font-playfair text-white mb-6">
                  Firm Headquarters
                </h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <MapPinIcon className="w-6 h-6 text-metro-gold flex-shrink-0 mt-1" />
                    <div>
                      <strong className="block text-white font-medium mb-1">
                        Address
                      </strong>
                      <span className="text-metro-muted">
                        100 Prestige Tower, Suite 4500
                        <br />
                        New York, NY 10005
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <PhoneIcon className="w-6 h-6 text-metro-gold flex-shrink-0 mt-1" />
                    <div>
                      <strong className="block text-white font-medium mb-1">
                        Phone
                      </strong>
                      <span className="text-metro-muted">
                        +1 (212) 555-0198
                        <br />
                        +1 (212) 555-0199 (Fax)
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <MailIcon className="w-6 h-6 text-metro-gold flex-shrink-0 mt-1" />
                    <div>
                      <strong className="block text-white font-medium mb-1">
                        Email
                      </strong>
                      <span className="text-metro-muted">
                        counsel@metrolaw.com
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <ClockIcon className="w-6 h-6 text-metro-gold flex-shrink-0 mt-1" />
                    <div>
                      <strong className="block text-white font-medium mb-1">
                        Hours
                      </strong>
                      <span className="text-metro-muted">
                        Monday - Friday
                        <br />
                        8:00 AM - 6:00 PM EST
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Functional Leaflet Map */}
              <div className="aspect-square bg-metro-black border border-metro-border relative overflow-hidden z-0">
                <MapContainer
                  center={[40.7128, -74.006]}
                  zoom={15}
                  scrollWheelZoom={false}
                  className="w-full h-full z-0">

                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                  <Marker position={[40.7128, -74.006]} icon={markerIcon}>
                    <Popup>
                      <div className="font-playfair font-medium text-metro-black">
                        Metro Law Firm
                      </div>
                      <div className="text-sm text-gray-600">
                        100 Prestige Tower
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>);

}