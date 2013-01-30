#JQuery Validation Groups for WebForms

A plug-in that takes the pain out of using JQuery validation with ASP.Net WebForms. 

Enables "validation groups" using JQuery Validation with ASP.Net WebForms.

For more information please see [blog post] (http://www.contentedcoder.com/2012/08/jquery-validation-groups-for-webforms.html).

**Get Started**

Replace the validate bind the validate event from:
 
```javascript
$("#aspForm").validate();
 ```

To:

 ```javascript
$("#aspForm").validateWebForm();
 ```

To create a validation group, add the class "form" to the containing element. Add the class "submit" to the element that should validate upon submit. Now these will be validated seperately, even though they are within the same form:

 ```xml
<fieldset class="form" id="signup">
<asp:Textbox ID="uxUsername" runat="server" CssClass="required" />
<asp:Button ID="uxRegister" runat="server" Text="Sign Up" CssClass="submit" />
</fieldset>
 ```

That's it!

**FULL EXAMPLE**

 ```xml
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Multiple Form Validation</title>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
    <script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/jquery.validate.min.js"></script>
    <script type="text/javascript" src="jquery.validation.net.webforms.js"></script>
    <script type="text/javascript">
        $(function() {
            $("#aspForm").validateWebForm();
        });
    </script>
</head>
<body>
    <form id="aspForm" runat="server">
        <fieldset class="form" id="signup">
            <legend>Sign Up</legend>
            <p>
                <asp:Label ID="uiFirstName" runat="server" AssociatedControlID="uxFirstName" Text="First name:"></asp:Label>
                <asp:TextBox ID="uxFirstName" runat="server" CssClass="required"></asp:TextBox>
            </p>
            <p>
                <asp:Button ID="uxRegister" runat="server" Text="Sign Up" CssClass="submit signup" />
                <asp:Button ID="uxCancelRegister" runat="server" Text="Cancel" />
            </p>
        </fieldset>
        <fieldset class="form" id="login">
            <legend>Login</legend>
            <p>
                <asp:Label ID="uiUserName" runat="server" AssociatedControlID="uxUserName" Text="User name:"></asp:Label>
                <asp:TextBox ID="uxUserName" runat="server" CssClass="required email"></asp:TextBox>
            </p>
            <p>
                <asp:Button ID="uxLogin" runat="server" Text="Login" CssClass="submit login" />
                <asp:Button ID="uxCancelSignUp" runat="server" Text="Cancel" />
            </p>
        </fieldset>
    </form>
</body>
</html>
 ```

 **Feedback**

 This plug-in is being actively maintained. If you see an issue please flag it either vai the blog post or by raising an issue via Github.