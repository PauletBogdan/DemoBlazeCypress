Feature: Test the checkout functionalities

    Background:
        Given The user navigates to the "demoblaze" web site
        Then The user verifies the title of the page is "STORE"
        Then The user verifies he landed on the home page


    # Scenario: The user verifies the total checkout value
    #     Given The user logs in to the DemoBlaze website
    #     When The user navigates to his cart
    #     Then The user verifies that the total in the cart equals the products sum

    # Scenario: The user verifies if he can place an order without paying
    #     Given The user logs in to the DemoBlaze website
    #     When The user navigates to his cart
    #     Then The user places an order without the credit card

    Scenario: The user verifies if he can place an order with the corect information
        Given The user logs in to the DemoBlaze website
        When The user navigates to his cart
        Then The user places an order completing all the fields
        Then The user verifies the order was placed successfully
