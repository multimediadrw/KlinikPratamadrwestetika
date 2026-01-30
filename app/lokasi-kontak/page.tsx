import { AnimatedMaps } from "../components/animated-maps";

export const revalidate = 60;

export default function LokasiKontakPage() {
  const branches = [
    {
      id: 1,
      name: "Klinik Pratama DRW Estetika Magelang",
      alamat: "Jl. Jendral Sudirman No. 89, Rejowinangun Selatan, Kec. Magelang Selatan, Magelang 59214",
      telp: "(0293) 3195 392",
      wa: "085799643777",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.7518521150245!2d110.20234!3d-7.4833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a1f1f1f1f1f1f%3A0x1f1f1f1f1f1f1f1f!2sJl.%20Jendral%20Sudirman%2C%20Magelang!5e0!3m2!1sid!2sid!4v1234567890",
    },
    {
      id: 2,
      name: "Klinik Pratama DRW Estetika Purworejo",
      alamat: "Jl Jendral Sudirman No 1, Purworejo, Jawa Tengah, Indonesia 54111",
      telp: "0275-7530777",
      wa: ["085712859999", "082323606087"],
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.5!2d110.2!3d-7.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a2f2f2f2f2f2f%3A0x2f2f2f2f2f2f2f2f!2sJl.%20Jendral%20Sudirman%2C%20Purworejo!5e0!3m2!1sid!2sid!4v1234567890",
    },
    {
      id: 3,
      name: "Klinik Pratama DRW Estetika Kutoarjo",
      alamat: "Jl. Mardi Usodo Timur Alun-alun No. 6, Kutoarjo",
      telp: "0275-6451864",
      wa: "085360005684",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.2!2d109.914978!3d-7.7182917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a3f3f3f3f3f3f%3A0x3f3f3f3f3f3f3f3f!2sJl.%20Mardi%20Usodo%20Timur%20Alun-alun%2C%20Kutoarjo!5e0!3m2!1sid!2sid!4v1234567890",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Lokasi & Kontak</h1>
          <p className="text-xl">Kunjungi cabang kami di berbagai lokasi</p>
        </div>
      </section>

      <section className="py-20 bg-pink-50">
        <div className="container mx-auto px-4">
          <AnimatedMaps branches={branches} />
        </div>
      </section>
    </main>
  );
}
