Feature: Test the checkout functionalities

    Background:
        Given The user navigates to the "demoblaze" web site
        Then The user verifies the title of the page is "STORE"
        Then The user verifies he landed on the home page


    Scenario: The user verifies if he can delete a product from the cart
        Given The user logs in to the DemoBlaze website
        When The user navigates to his cart
        Then The user deletes any of the products from the cart
            | productName      |
            | Apple monitor 24 |

    Scenario: The user verifies if he can delete a product from the cart
        Given The user logs in to the DemoBlaze website
        When The user navigates to his cart
        Then The user deletes all of the "Sony vaio i5" products from the cart

# Scenario: The user verifies if he can delete a product from the cart
    #     Given The user logs in to the DemoBlaze website
    #     When The user navigates to his cart
    #     Then The user deletes all the products from the cart