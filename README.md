# Instant Pot Database

A comprehensive, searchable database of Instant Pot cooking times for dried legumes and fresh vegetables, compiled from 50+ trusted sources.

[![Live Site](https://img.shields.io/badge/Live-Site-brightgreen)](YOUR_DEPLOYMENT_URL_HERE)
[![GitHub](https://img.shields.io/badge/GitHub-Repo-blue)](https://github.com/duke8585/instant-pot-database)

## 🎯 What is this?

Ever Googled "how long to cook chickpeas in Instant Pot" and gotten wildly different answers? This database solves that problem by:

- **Aggregating 160+ curated entries** from 50+ trusted cooking sources
- **Showing ALL variations** so you can see the range and make informed decisions
- **Providing context** for why times differ (texture goals, soaking, bean age, etc.)
- **Citing sources** with direct links for deeper research

## ✨ Features

- ✅ **Searchable & Filterable Table** - Find exactly what you need instantly
- ✅ **Sortable Columns** - Sort by ingredient, time, pressure, or any field
- ✅ **Mobile Responsive** - Works great on phones, tablets, and desktop
- ✅ **Source Citations** - Every entry links back to the original source
- ✅ **Comprehensive Guide** - Best practices, tips, and common mistakes
- ✅ **Free & Open Source** - No ads, no paywalls, all data is open

## 📊 What's Included

**Ingredients Covered:**
- All types of lentils (red, brown, green, French, yellow, black beluga)
- Beans (chickpeas, black, pinto, kidney, navy, cannellini, great northern)
- Peas (black-eyed, split peas, mung beans)
- Vegetables (potatoes, carrots, broccoli, cauliflower, beets, and more)

**Data Points for Each Entry:**
- Ingredient name
- State (soaked/unsoaked/fresh)
- Pressure level (high/low)
- Cooking time in minutes
- Water ratio
- Release method (NPR, quick release, timed)
- Expected texture/goal
- Post-processing steps
- Source name and URL

## 🚀 How It Works

### Tech Stack

**Frontend:**
- React 18 with Vite
- TailwindCSS for styling
- React Markdown for guide rendering
- PapaParse for CSV parsing

**Data:**
- All cooking data stored in `database.csv`
- Guide content in Markdown files
- Simple, maintainable, version-controlled

**Deployment:**
- Static site - can be deployed anywhere
- No backend needed
- Lightning fast

### Project Structure

```
instant-pot-database/
├── database.csv                    # Main data file
├── instant-pot-guide.md            # Comprehensive guide
├── instant-pot-app/
│   ├── src/
│   │   ├── components/
│   │   │   ├── DataTable.jsx       # Searchable table component
│   │   │   └── MarkdownViewer.jsx  # Guide viewer
│   │   └── App.jsx                 # Main app
│   └── public/
│       ├── database.csv            # Copy of main CSV
│       └── instant-pot-guide.md    # Copy of guide
└── README.md
```

## 🤝 How to Contribute

Contributions are welcome! Here's how you can help:

### Adding New Cooking Times

The easiest way to contribute is by adding new entries to the database:

1. **Fork this repository**

2. **Edit `database.csv`** - Add your row with the following columns:
   ```
   Ingredient,State,Pressure,Time (min),Water Ratio,Release Method,Texture/Goal,Post-Processing,Source,Source URL
   ```

   **Example:**
   ```csv
   "Chickpeas","Soaked overnight","High","15","1:2","20 min NPR","Tender and creamy","Drain excess water","My Awesome Blog","https://example.com/chickpeas"
   ```

3. **Important CSV Guidelines:**
   - Quote ALL values (use `"value"` format)
   - This prevents issues with commas within values
   - Include the source URL if available (use empty string `""` if not)
   - Be specific about conditions (soaking time, bean age, etc.)

4. **Test locally** (optional but recommended):
   ```bash
   # For local testing only, copy to public folder:
   cp database.csv instant-pot-app/public/database.csv

   cd instant-pot-app
   npm install
   npm run dev
   ```

   > **Note:** You only need to edit `database.csv` in your PR. GitHub Actions automatically syncs it to the public folder when your PR is merged. The manual copy is only needed for local testing.

5. **Create a Pull Request** with:
   - Clear description of what you're adding
   - Source citation
   - Any relevant notes about the recipe

### Improving the Guide

Found a typo or want to add tips? Edit `instant-pot-guide.md` and submit a PR!

### Fixing Bugs or Adding Features

1. Open an issue first to discuss the change
2. Fork and create a feature branch
3. Make your changes with clear commit messages
4. Submit a PR referencing the issue

## 📝 Data Quality Standards

To maintain accuracy and usefulness:

- ✅ **Cite your sources** - Include the blog/cookbook/website name and URL
- ✅ **Be specific** - "Soaked overnight" is better than just "Soaked"
- ✅ **Include context** - Note if beans are aged, if using altitude, etc.
- ✅ **Test before adding** - Ideally add recipes you've personally tested
- ✅ **No promotional content** - Focus on useful data, not marketing

## 🛠️ Development Setup

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Clone the repo
git clone https://github.com/duke8585/instant-pot-database.git
cd instant-pot-database

# Install dependencies
cd instant-pot-app
npm install

# Start dev server
npm run dev
```

Visit `http://localhost:5173` to see the site running locally.

### Building for Production

```bash
npm run build
```

Output will be in `instant-pot-app/dist/` - ready to deploy to any static hosting service.

## 📜 Data Format Reference

### CSV Column Descriptions

| Column | Description | Example |
|--------|-------------|---------|
| `Ingredient` | Name of the ingredient | `"Chickpeas"` |
| `State` | Soaked/Unsoaked/Fresh | `"Soaked overnight"` |
| `Pressure` | High or Low | `"High"` |
| `Time (min)` | Cooking time in minutes | `"15"` |
| `Water Ratio` | Water to ingredient ratio | `"1:2"` |
| `Release Method` | NPR/Quick/Timed | `"20 min NPR"` |
| `Texture/Goal` | Expected outcome | `"Tender and creamy"` |
| `Post-Processing` | What to do after cooking | `"Drain excess water"` |
| `Source` | Name of source | `"Rainbow Plant Life"` |
| `Source URL` | Link to source | `"https://..."` |

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

The compiled data is freely available for anyone to use. If you use this data in your own project, a link back would be appreciated but is not required.

## 🙏 Acknowledgments

This database wouldn't exist without the hard work of food bloggers, recipe developers, and home cooks who shared their knowledge:

- Rainbow Plant Life
- Minimalist Baker
- Amy + Jacky (Pressure Cook Recipes)
- Hip Pressure Cooking
- Piping Pot Curry
- The Kitchn
- And 40+ other sources cited in the database

Special thanks to the r/InstantPot and r/PressureCooking communities for their invaluable insights.

## 📧 Contact

- **Issues/Suggestions**: [Open an issue](https://github.com/duke8585/instant-pot-database/issues)
- **Reddit**: [Post on r/InstantPot](https://reddit.com/r/instantpot)

## 🌟 Star History

If you find this useful, consider giving it a star on GitHub! It helps others discover the project.

---

**Made with ❤️ for the Instant Pot community**
