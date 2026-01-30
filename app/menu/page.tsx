import fs from "fs";
import path from "path";

interface Treatment {
  nama: string;
  layanan: string[];
  harga: string;
  manfaat: string;
}

interface MenuData {
  [key: string]: Treatment[];
}

export const revalidate = 60;

const categories: { [key: string]: string } = {
  anti_acne_treatment: "Anti Acne",
  post_acne_treatment: "Post Acne",
  anti_aging_treatment: "Anti Aging",
  flex_pigment_treatment: "Flek & Pigment",
  glow_skin_treatment: "Glow Skin",
  body_treatment: "Body Treatment",
  lymphatic_treatment: "Lymphatic",
  hair_treatment: "Hair Treatment",
  nail_treatment: "Nail/Hand/Foot",
};

async function getMenuData(): Promise<MenuData> {
  const filePath = path.join(process.cwd(), "public", "menu.json");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileContent);
}

export default async function MenuPage() {
  const menuData = await getMenuData();
  const firstCategory = Object.keys(menuData)[0];
  const treatments = menuData[firstCategory] || [];

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Menu Treatment</h1>
          <p className="text-xl">Pilih treatment yang sesuai dengan kebutuhan Anda</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-pink-50">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Category Tabs */}
          <div className="mb-12 flex flex-wrap gap-3 justify-center">
            {Object.entries(categories).map(([key, label]) => (
              <a
                key={key}
                href={`/menu?category=${key}`}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  key === firstCategory
                    ? "bg-pink-600 text-white shadow-lg"
                    : "bg-white text-pink-600 border-2 border-pink-600 hover:bg-pink-50"
                }`}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Treatments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatments.map((treatment, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border-t-4 border-pink-600"
              >
                <h3 className="text-xl font-bold text-pink-900 mb-3">
                  {treatment.nama}
                </h3>
                <p className="text-gray-700 mb-4 text-sm">{treatment.manfaat}</p>
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-600 mb-2">
                    Layanan Termasuk:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {treatment.layanan.map((service, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-pink-600 mr-2">•</span>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t pt-4 flex items-center justify-between">
                  <span className="text-2xl font-bold text-pink-600">
                    {treatment.harga}
                  </span>
                  <a
                    href="/lokasi-kontak"
                    className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors text-sm font-semibold"
                  >
                    Pesan
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
