const checkRequestFormate = (rule, req) => {
    const errors = [];

    const checkSection = (sectionName, sectionRules, requestSection) => {
        for (const [key, constraints] of Object.entries(sectionRules)) {
            const value = requestSection?.[key];

            // Required check
            if (constraints.required && (!value)) {
                errors.push(`${key} is required in ${sectionName}`);
                continue;
            }

            // Type check only if value exists
            if (value !== undefined && constraints.type) {
                const type = constraints.type;
                const actualType = Array.isArray(value) ? "array" : typeof value;

                if (actualType !== type) {
                    errors.push(
                        `${key} in ${sectionName} should be of type ${type}, got ${actualType}`
                    );
                }
            }
        }
        //Check for extra fields not defined in the rule

        for (const key of Object.keys(requestSection)) {
            if (!sectionRules.hasOwnProperty(key)) {
                errors.push(`${key} is not allowed in ${sectionName}`);
            }
        }
    };

    if (rule.body) {
        checkSection("body", rule.body, req.body);
    }

    if (rule.headers) {
        checkSection("headers", rule.headers, req.headers);
    }

    if (rule.cookies) {
        checkSection("cookies", rule.cookies, req.cookies);
    }

    if (rule.query) {
        checkSection("query", rule.query, req.query);
    }

    return {
        valid: errors.length === 0,
        errors,
    };
};

module.exports = {
    checkRequestFormate
}