---
title: "Shopify Horizon Theme: Implementing Selectable Menu Types"
description: "Learn how to extend the Shopify Horizon theme to support both megamenu and dropdown menu types, giving your store's navigation a modern touch."
publishDate: "2025-12-20"
author: "Morshadun Nur"
image: "/images/blog-4.jpg"
tags: ["Shopify", "Horizon Theme", "E-commerce", "Store Design", "Shopify Theme Customization", "Shopify Theme Development"]
---

In this tutorial, we’ll walk through how to extend the standard Shopify header menu to support a compact "Dropdown" style alongside the traditional "Megamenu". This customization gives content managers the flexibility to choose the best layout for each menu item directly from the Theme Editor.

## The Challenge

By default, our theme utilized a full-width "megamenu" layout for all nested links. While great for large catalogs, this style is often overkill for simple lists. We wanted to introduce a setting that allows users to toggle between:


- **Megamenu:** The standard immersive, full-width layout.
- **Dropdown:** A compact, classic vertical list.

Here is the exact code implementation to achieve this.

---

## Step 1: Extend the Schema

First, we need to add a setting to the block schema to capture the user's preference. We modified `blocks/_header-menu.liquid` to include a new `select` input. This ensures backward compatibility by defaulting to "megamenu".

**File:** `blocks/_header-menu.liquid`

Add this object to your block's `settings` array:

```json
{
  "type": "select",
  "id": "submenu_type",
  "label": "Submenu type",
  "options": [
    {
      "value": "megamenu",
      "label": "Megamenu"
    },
    {
      "value": "dropdown",
      "label": "Dropdown"
    }
  ],
  "default": "megamenu"
}
```

## Step 2: Implement Conditional Logic

Next, we update the Liquid template to render the appropriate component based on the selected setting. In `snippets/header-menu.liquid`, we check the setting and wrap the dropdown in the appropriate container classes that our CSS will target.

**File:** `snippets/header-menu.liquid`

Replace the rendering logic (usually inside the nested link loop) with this:

```liquid
{%- assign submenu_type = block.settings.submenu_type -%}
{%- if submenu_type == 'dropdown' -%}
  <div class="menu-list__submenu menu-list__submenu--dropdown{{ color_scheme_classes }}" ref="submenu[]">
    <div
      id="submenu-{{ forloop.index }}"
      class="menu-list__submenu-inner"
      style="{% render 'submenu-font-styles', settings: block_settings %}"
    >
      {% assign list_id = 'MegaMenuList-' | append: forloop.index %}
      {% render 'qb-dropdown-menu', section: section, parent_link: link, id: list_id %}
    </div>
  </div>
{%- else -%}
  {% render 'mega-menu',
    link: link,
    index: index,
    block: block,
    menulink_link: menulink_link,
    menulink_title: menulink_title
  %}
{%- endif -%}
```

> **Note:** The class `menu-list__submenu--dropdown` on the wrapper is crucial for our CSS selectors in Step 4.

## Step 3: Create the Dropdown Component

We use a lightweight snippet for the dropdown content itself. This snippet handles the list structure and basic layout.

**File:** `snippets/qb-dropdown-menu.liquid`

Create this new snippet:

```liquid
{%- doc -%}
  Simple dropdown menu for header submenu.
{%- enddoc -%}

<div class="qb-dropdown-menu">
  <ul class="qb-dropdown__list list-unstyled" data-menu-list-id="{{ id }}">
    {% for child in parent_link.links %}
      <li class="qb-dropdown__item">
        <a
          href="{{ child.url }}"
          class="mega-menu__link"
        >
          <span class="mega-menu__link-title wrap-text">{{- child.title -}}</span>
        </a>

        {% if child.links != blank %}
          <ul class="qb-dropdown__sublist list-unstyled">
            {% for grand in child.links %}
              <li class="qb-dropdown__subitem">
                <a href="{{ grand.url }}" class="mega-menu__link">
                  <span class="mega-menu__link-title wrap-text">{{- grand.title -}}</span>
                </a>
              </li>
            {% endfor %}
          </ul>
        {% endif %}
      </li>
    {% endfor %}
  </ul>
</div>

{% stylesheet %}
  /* Compact dropdown panel (not full-width) */
  .qb-dropdown-menu {
    width: max-content;
    max-width: 320px;
    padding: var(--padding-sm);
  }

  /* Ensure the submenu container aligns left when showing dropdown */
  .menu-list__submenu-inner:has(.qb-dropdown-menu) {
    justify-content: flex-start;
  }

  .qb-dropdown-menu .qb-dropdown__list {
    display: block;
  }

  .qb-dropdown-menu .qb-dropdown__item {
    white-space: normal;
    padding-block: var(--padding-2xs);
  }

  .qb-dropdown-menu .qb-dropdown__sublist {
    margin-top: var(--padding-xs);
    padding-inline-start: var(--padding-sm);
    display: block;
  }

  .qb-dropdown-menu .qb-dropdown__subitem {
    white-space: normal;
    padding-block: 2px;
  }
{% endstylesheet %}
```

## Step 4: Styling & Polishing

The trickiest part of this implementation was handling the theme's global background overlay (`.overflow-menu::after`), which is designed to cover the content area when a megamenu is open. For a simple dropdown, this overlay is unnecessary and distracting.

We added specific CSS to `blocks/_header-menu.liquid` to:

1. **Constrain the Width:** Force the dropdown container to hug its content (`max-content`) instead of stretching full-width.
2. **Smooth Transitions:** Add a subtle slide-up and fade-in animation.
3. **Hide the Overlay:** Aggressively hide the global background when interacting with a dropdown item.

**File:** `blocks/_header-menu.liquid`

Add this to your stylesheet:

```css
/* Dropdown Styles */
.menu-list__list-item:has(> .menu-list__submenu--dropdown) {
  position: relative;
}

.menu-list__list-item > .menu-list__submenu.menu-list__submenu--dropdown {
  width: max-content !important;
  left: 0;
  right: auto;
  clip-path: none !important;
  
  /* Smooth Open Animation */
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
}

.menu-list__list-item:where(:hover, :focus-within) > .menu-list__submenu.menu-list__submenu--dropdown {
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
}

/* Hide shared background for dropdowns smoothly */
.overflow-menu:has(.menu-list__list-item:hover > .menu-list__submenu--dropdown)::after,
.overflow-menu:has(.menu-list__list-item:focus-within > .menu-list__submenu--dropdown)::after {
  opacity: 0 !important;
  height: 0 !important;
  pointer-events: none !important;
  box-shadow: none !important;
}

/* Fix dropdown text color */
.menu-list__list-item .menu-list__submenu--dropdown a {
  color: var(--menu-child-font-color) !important;
}
```

## Conclusion

With just a few strategic updates to the schema, logic, and CSS, we've successfully added a robust "Dropdown" mode. This allows for a cleaner navigation experience for simple categories while preserving the rich "Megamenu" for more complex sections.
