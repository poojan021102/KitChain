const checkRequestFormate = (rule, req) => {
    const errors = [];

    const checkSection = (sectionName, sectionRules, requestSection = {}) => {
        for (const [key, constraints] of Object.entries(sectionRules)) {
            const value = requestSection[key];

            // Required check
            if (constraints.required && (value === undefined || value === null || value === '')) {
                errors.push(`${key} is required in ${sectionName}`);
                continue;
            }

            // Type check only if value exists
            if (value !== undefined && constraints.type) {
                const expectedType = constraints.type;
                const actualType = Array.isArray(value) ? "array" : typeof value;

                if (actualType !== expectedType) {
                    errors.push(`${key} in ${sectionName} should be of type ${expectedType}, got ${actualType}`);
                    continue;
                }
            }

            // Exact value check (enum-like)
            if (value !== undefined && constraints.exact && !constraints.exact.includes(value)) {
                errors.push(`${key} in ${sectionName} must be one of [${constraints.exact.join(", ")}], got "${value}"`);
            }
        }

        // Check for extra fields not defined in the rule
        // for (const key of Object.keys(requestSection)) {
        //     if (!sectionRules.hasOwnProperty(key)) {
        //         errors.push(`${key} is not allowed in ${sectionName}`);
        //     }
        // }
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
    checkRequestFormate,
};


module.exports = {
    checkRequestFormate
}