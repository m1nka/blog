# Personal blog

[![Deploy Jekyll site to Pages](https://github.com/m1nka/blog/actions/workflows/jekyll.yml/badge.svg?branch=master)](https://github.com/m1nka/blog/actions/workflows/jekyll.yml)

Project was forked from [aspirethemes/type](https://github.com/aspirethemes/type).

## Local Development

To run the blog locally for development:

1. Initialize rbenv (required for Ruby 3.1.0):
   ```bash
   eval "$(rbenv init -)"
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

3. Start the local development server:
   ```bash
   bundle exec jekyll serve
   ```

4. Open your browser and navigate to `http://localhost:4000`

The site will automatically rebuild when you make changes to files.

**Note:** This project requires Ruby 3.1.0 (managed via rbenv). The rbenv initialization step ensures the correct Ruby version is used.
