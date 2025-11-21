# Contributing to Instant Pot Database

Thank you for considering contributing to the Instant Pot Database! This document provides guidelines and instructions for contributing.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Adding New Cooking Times](#adding-new-cooking-times)
- [Improving Documentation](#improving-documentation)
- [Reporting Bugs](#reporting-bugs)
- [Pull Request Process](#pull-request-process)

## 🤝 Code of Conduct

This project is a resource for the cooking community. Please:

- Be respectful and constructive
- Focus on the accuracy and usefulness of the data
- Credit sources appropriately
- Help others learn and improve

## 🎯 How Can I Contribute?

### 1. Adding New Cooking Times

This is the most valuable contribution! See [detailed instructions below](#adding-new-cooking-times).

### 2. Improving the Guide

Found a typo? Have a great tip? Edit `instant-pot-guide.md` and submit a PR.

### 3. Fixing Data Errors

Spot incorrect cooking times or broken source links? Please fix them!

### 4. Improving the Website

Know React? Help improve the UI, add features, or fix bugs.

### 5. Spreading the Word

Share the database with others who might find it useful!

## 📝 Adding New Cooking Times

### Step-by-Step Guide

**1. Fork the Repository**

Click the "Fork" button at the top right of the GitHub page.

**2. Clone Your Fork**

```bash
git clone https://github.com/YOUR_USERNAME/instant-pot-database.git
cd instant-pot-database
```

**3. Create a Branch**

```bash
git checkout -b add-my-cooking-times
```

**4. Edit the CSV File**

Open `database.csv` in your favorite editor.

**Important CSV Rules:**
- Quote ALL values: `"value"` not `value`
- Include all 10 columns (use `""` for empty values)
- Follow the existing format exactly

**Example of a well-formatted entry:**
```csv
"Black Lentils","Unsoaked","High","10","1:2","10 min NPR then QR","Soft and creamy","Drain if needed","My Food Blog","https://myfoodblog.com/lentils"
```

**5. Update the Public Copy**

```bash
cp database.csv instant-pot-app/public/database.csv
```

**6. Test Locally (Optional but Recommended)**

```bash
cd instant-pot-app
npm install
npm run dev
```

Visit `http://localhost:5173` and verify your entry appears correctly.

**7. Commit Your Changes**

```bash
git add database.csv instant-pot-app/public/database.csv
git commit -m "Add cooking times for [ingredient] from [source]"
```

**8. Push to Your Fork**

```bash
git push origin add-my-cooking-times
```

**9. Create a Pull Request**

- Go to your fork on GitHub
- Click "Pull Request"
- Fill in the description explaining what you're adding
- Submit!

### Data Quality Guidelines

**Required Information:**
- ✅ Ingredient name (be specific: "Red Lentils" not just "Lentils")
- ✅ State (Soaked overnight, Unsoaked, Fresh, etc.)
- ✅ Cooking time in minutes
- ✅ Source name and ideally a URL

**Best Practices:**
- ✅ Include water ratios when known
- ✅ Specify release method (Natural, Quick, "10 min NPR then QR")
- ✅ Note expected texture ("Tender with bite", "Soft and creamy")
- ✅ Add post-processing steps ("Drain", "Remove immediately")
- ✅ Be specific about conditions that affect cooking:
  - Bean age (fresh vs old beans cook differently)
  - Altitude (higher = longer times)
  - Soaking duration (overnight vs 4 hours)
  - Pot size (6-quart vs 8-quart)

**Sources We Love:**
- Food blogs with tested recipes
- Cookbooks (cite book name and author)
- Manufacturer guidelines
- Your own extensively tested recipes

**Please Avoid:**
- ❌ Untested or estimated times
- ❌ Promotional content or affiliate links
- ❌ Duplicate entries (check first!)
- ❌ Recipes for complete dishes (we focus on ingredient cooking times)

## 📖 Improving Documentation

### Editing the Guide

The guide is in `instant-pot-guide.md`. It's written in standard Markdown.

**Good contributions:**
- Fixing typos or unclear wording
- Adding helpful tips based on experience
- Correcting inaccurate information
- Adding missing best practices
- Improving organization and readability

**Please include sources** for any tips or advice you add!

### Updating the README

Found something unclear in the README? Submit a PR to make it better!

## 🐛 Reporting Bugs

Found a bug? Please open an issue with:

1. **Clear title**: "Table sorting doesn't work on mobile"
2. **Description**: What happened vs what you expected
3. **Steps to reproduce**: How can we see the bug?
4. **Screenshots**: If applicable
5. **Device/Browser**: What you were using

## 🔄 Pull Request Process

### Before Submitting

- [ ] Test your changes locally if possible
- [ ] Make sure CSV is properly formatted (all values quoted)
- [ ] Update both `database.csv` and `instant-pot-app/public/database.csv`
- [ ] Write a clear commit message
- [ ] One logical change per PR (don't mix different types of changes)

### PR Description Template

```markdown
## What does this PR do?

Brief description of the change

## Type of Change

- [ ] Add new cooking times
- [ ] Fix data error
- [ ] Improve documentation
- [ ] Fix bug
- [ ] Add feature

## Source(s)

- [Source name](URL)

## Testing

How did you test this? (if applicable)

## Additional Notes

Any other context or information
```

### After Submitting

- Be responsive to feedback
- Make requested changes promptly
- Be patient - reviews may take a few days

## 💡 Tips for First-Time Contributors

**New to GitHub?** No problem!

1. GitHub has a great [Hello World guide](https://guides.github.com/activities/hello-world/)
2. You can also [edit files directly on GitHub](https://docs.github.com/en/repositories/working-with-files/managing-files/editing-files) (easier for small changes)
3. Don't be afraid to ask questions in your PR!

**Quick Contribution Option:**
- Go to `database.csv` on GitHub
- Click the pencil icon (Edit)
- Make your changes
- GitHub will automatically create a fork and PR for you!

## 🏆 Recognition

Contributors will be recognized in the project! We may add a contributors section highlighting major contributions.

## ❓ Questions?

- Open an issue with your question
- Check existing issues - your question might be answered
- Be specific and clear

## 📜 License

By contributing, you agree that your contributions will be licensed under the same MIT License that covers the project.

---

**Thank you for making this resource better for everyone!** 🙏

Every contribution, no matter how small, helps the Instant Pot community.
