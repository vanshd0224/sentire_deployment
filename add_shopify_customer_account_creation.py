import os

modal_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\AccountDrawerModal.tsx"

with open(modal_path, "r", encoding="utf-8") as f:
    modal_code = f.read()

# Check if Shopify customer creation function exists or add it
shopify_func = """
  // Create / Register Customer natively in Shopify Database (hbj1d0-99.myshopify.com/customers)
  const registerShopifyCustomer = async (email: string, phone: string, name: string) => {
    try {
      const storeDomain = "hbj1d0-99.myshopify.com";
      const graphqlUrl = `https://${storeDomain}/api/2026-07/graphql.json`;
      
      const names = name.split(" ");
      const firstName = names[0] || "Customer";
      const lastName = names.slice(1).join(" ") || "Sentire";

      const query = `
        mutation customerCreate($input: CustomerCreateInput!) {
          customerCreate(input: $input) {
            customer {
              id
              email
              firstName
              lastName
            }
            customerUserErrors {
              code
              field
              message
            }
          }
        }
      `;

      const variables = {
        input: {
          email: email || `${phone.replace(/[^0-9]/g, "")}@sentirebypc.com`,
          firstName,
          lastName,
          phone: phone.startsWith("+") ? phone : `+91${phone.replace(/[^0-9]/g, "")}`,
          acceptsMarketing: true
        }
      };

      await fetch(graphqlUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": "mock_storefront_token" // or admin API
        },
        body: JSON.stringify({ query, variables })
      });
    } catch (e) {
      console.log("Shopify customer sync notice:", e);
    }
  };
"""

print("Checking AccountDrawerModal.tsx for Shopify customer sync...")
