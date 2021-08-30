def pr_iterator(array):
    pr = None

    for i in array:
        yield i, pr
        pr = i


def ex(ex):
    raise ex


import math
operations = None
default_operations = {
    ",": (1, lambda x, y: (x, y)),
    "+": (3, lambda x, y: x + y),
    "-": (3, lambda x, y: x - y),
    "unary +": (3, lambda x: x),
    "unary -": (3, lambda x: -x),
    "*": (6, lambda x, y: x * y),
    "/": (6, lambda x, y: x / y if y != 0 else float("inf")),
    "^": (9, lambda x, y: x ** y),
    "unary sqrt": (9, lambda x: x ** 0.5 if x >= 0 else ex(ValueError("Square root of a negative number."))),

    "unary pow": (9, lambda x: x[0]**x[1]),
    "unary fact": (9, math.factorial),
    "unary sin": (9, math.sin),
    "unary cos": (9, math.cos),
    "unary log": (9, lambda x: (math.log(x) if x > 0 else ex(ValueError("Value x can't be zero for log!")))
                                if len(x) == 1 or isinstance(x, (int, float))
                                else math.log(x[0], x[1]) if x[0] > 0 and x[1] > 0 and x[1] != 1 else
                                ex(ValueError("Values for can't be zero (and one for base) for log!"))),
}

default_variables = {"pi": 3.14159265359, "e": 2.71828182846}

if operations is None:
    operations = default_operations

if None in operations:
    operations.update(default_operations)

operations = operations
special = ["(", ")", ","]

def unary_place( pr_token):
    return pr_token is None or pr_token == "(" or pr_token in operations

def isfloat(v):
    try:
        float(str(v))
        return True
    except ValueError:
        return False

def tokenized( expr, **variables):
    return list(tokenize(expr, **variables))

def tokenize( expr, **variables):
    token = ""
    token_pr = None

    for s in expr:
        if s in (" ", "\n"):
            if token:
                yield token
                token_pr = token
                token = ""

            continue

        if token and isfloat(token) and not isfloat(token + s):
            yield token
            token_pr = token
            token = ""

        token += s

        if token in operations or token in special or token in variables \
                or (unary_place(token_pr) and f"unary {token}" in operations):
            yield token
            token_pr = token
            token = ""

    if token:
        yield token

def infix_to_postfixed( expr, **variables):
    return list(infix_to_postfix(expr, **variables))

def infix_to_postfix( expr, **variables):
    if isinstance(expr, (str, )):
        expr =  tokenize(expr, **variables)

    p = lambda x: operations.get(x, (0, 0))[0]

    stack = []

    top = lambda: stack[-1]

    for token, pr_token in pr_iterator(expr):
        if token == ")":
            while stack:
                current_top = stack.pop(-1)

                if current_top == "(": break

                yield current_top

            else:
                raise ValueError("Unbalanced brackets")

            continue

        if token == "(":
            stack.append(token)
            continue

        if unary_place(pr_token) and f"unary {token}" in operations:
            token = f"unary {token}"

        elif token not in operations:
            yield token
            continue

        while stack and p(top()) >= p(token):
            yield stack.pop(-1)

        stack.append(token)

    while stack:
        yield stack.pop(-1)

def calculate_safe(expr, **variables):
    try:
        return True, calculate(expr, **variables)
    except ValueError:
        return False, 0

def prepare_token(token):
    # You can just return `token` it will turn calculator to small programming language

    if isinstance(token, (int, float)):
        return token

    if isinstance(token, str):
        return float(token)

    if isinstance(token, (list, tuple)):
        return token

    return float(str(token))


def calculate(expr, **variables):
    variables.update(default_variables)

    postfix = infix_to_postfix(expr, **variables)

    stack = []

    for token in postfix:
        if token not in operations:
            if token in variables:
                if callable(variables[token]):
                    stack.append(variables[token]())
                else:
                    stack.append(variables[token])
            else:
                stack.append(token)

            continue

        if token.startswith("unary "):
            r = operations[token][1](prepare_token(stack.pop(-1)))

            if isinstance(r, float):
                stack.append(round(r, 10))
            else:
                stack.append(r)

        else:
            a = prepare_token(stack.pop(-1))
            b = prepare_token(stack.pop(-1))

            r = operations[token][1](b, a)

            if isinstance(r, float):
                stack.append(round(r, 10))
            else:
                stack.append(r)

    if len(stack) > 1:
        raise ValueError("Unbalanced expression")

    res = stack.pop(0)

    if isinstance(res, float):
        return round(res, 10)

    return res